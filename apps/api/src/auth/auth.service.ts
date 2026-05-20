import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { UserService } from '../user/user.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import { ERRORS } from 'shared';
import { isDev } from '../common/utils/is-dev.util';
import ms from 'ms';
import type { Response, Request, CookieOptions } from 'express';
import type { StringValue } from 'ms';
import type { JwtPayload } from '../common/interfaces/jwt.interface';
import { COOKIE_MAP } from './constants/cookie.constants';
import { getDeviceContext } from './utils/device-from-request.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow(
      'JWT_REFRESH_TOKEN_TTL',
    );

    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  /**
   * Создание JWT-токенов.
   * @param idUser ИДентификатор пользователя.
   * @returns AccessToken и RefreshToken.
   */
  private generateTokens(idUser: string) {
    if (!idUser) {
      throw new BadRequestException(ERRORS.auth.wrongId.code);
    }

    const payload: JwtPayload = { idUser };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Аутентификация пользователя.
   * @param req Request.
   * @param res Response.
   * @param id Идентификатор.
   * @returns AccessToken.
   */
  private async authUser(req: Request, res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);
    const refreshTokenTtlMs = ms(this.JWT_REFRESH_TOKEN_TTL);
    const expiresAt = new Date(Date.now() + refreshTokenTtlMs);
    const { deviceId, deviceInfo, platform } = getDeviceContext(req);

    await this.userService.saveUserSession({
      idUser: id,
      token: refreshToken,
      expiresAt,
      deviceId,
      deviceInfo,
      platform,
    });

    this.setTokenToCookie(res, refreshToken, refreshTokenTtlMs);

    return { accessToken };
  }

  /**
   * @returns Настройки cookie.
   */
  private getCookieOptions(): CookieOptions {
    const isDevMode = isDev(this.configService);

    return {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      secure: !isDevMode,
      sameSite: !isDevMode ? 'none' : 'lax',
    };
  }

  /**
   * Устанавливает в cookie данные о refresh-токене.
   * @param res Response.
   * @param token Токен.
   * @param maxAge Время жизни токена.
   */
  private setTokenToCookie(res: Response, token: string, maxAge: number) {
    res.cookie(COOKIE_MAP.refreshToken, token, {
      ...this.getCookieOptions(),
      maxAge,
    });
  }

  /**
   * Получает данные о refresh-токене из cookie.
   * @param req Request.
   * @returns Строка или Undefined.
   */
  private getTokenFromCookie(req: Request) {
    return req.cookies?.[COOKIE_MAP.refreshToken] as string | undefined;
  }

  /**
   * Обновление JWT-токенов.
   * @param req Request.
   * @param res Response.
   * @returns Новый токен.
   */
  async refreshUserTokens(req: Request, res: Response) {
    const refreshToken = this.getTokenFromCookie(req);

    if (!refreshToken)
      throw new UnauthorizedException(ERRORS.auth.invalidRefreshToken.code);

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (error) {
      console.warn(
        '[authService/refreshUserTokens] Ошибка валидации JWT',
        error,
      );

      throw new UnauthorizedException(ERRORS.auth.invalidRefreshToken.code);
    }

    if (!payload?.idUser) {
      throw new UnauthorizedException(ERRORS.auth.invalidRefreshToken.code);
    }

    const isTokenValid =
      await this.userService.isValidRefreshToken(refreshToken);

    if (!isTokenValid) {
      throw new UnauthorizedException(ERRORS.auth.invalidRefreshToken.code);
    }

    await this.userService.deleteUserSession(refreshToken);

    const user = await this.userService.getUserDataById(payload.idUser);

    if (!user) {
      throw new NotFoundException(ERRORS.auth.userNotFound.code);
    }

    return this.authUser(req, res, user.id);
  }

  /**
   * Регистрация нового пользователя.
   * @param req Request.
   * @param res Response.
   * @param dto Данные пользователя.
   * @returns JWT-токены при успешной регистрации.
   */
  async registerNewUser(req: Request, res: Response, dto: RegisterRequest) {
    const existUser = await this.userService.isUserExist(dto.email);

    if (existUser) {
      throw new ConflictException(ERRORS.register.userExist.code);
    }

    const passwordHash = await hash(dto.password);
    const userId = await this.userService.createNewUser(dto, passwordHash);

    if (!userId)
      throw new BadRequestException(ERRORS.register.createError.code);

    return this.authUser(req, res, userId);
  }

  /**
   * Вход на сайт.
   * @param req Request.
   * @param res Response.
   * @param dto Данные пользователя.
   * @returns JWT-токены при успешной аутентификации.
   */
  async login(req: Request, res: Response, dto: LoginRequest) {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (!existingUser) {
      throw new UnauthorizedException(ERRORS.auth.invalidData.code);
    }

    const isValidPassword = await verify(
      existingUser.passwordHash,
      dto.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(ERRORS.auth.invalidData.code);
    }

    return this.authUser(req, res, existingUser.id);
  }

  /**
   * Выход пользователя из системы.
   * @param req Request.
   * @param res Response.
   * @returns true.
   */
  async logout(req: Request, res: Response) {
    const refreshToken = this.getTokenFromCookie(req);

    if (refreshToken) {
      await this.userService.deleteUserSession(refreshToken);
    }

    res.clearCookie(COOKIE_MAP.refreshToken, this.getCookieOptions());

    return true;
  }
}
