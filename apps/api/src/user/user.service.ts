import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from '../auth/dto/register.dto';
import { ERRORS } from 'shared';
import { TokenData } from '../common/interfaces/tokenData.interface';
import { ConfigService } from '@nestjs/config';
import { customSha256Hash } from '../common/utils/hash.util';
import { DEFAULT_MAX_SESSIONS } from './constants/user.constants';

@Injectable()
export class UserService {
  private readonly TOKEN_HASH_SECRET: string;
  private readonly USER_SESSION_LIMIT: number;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.TOKEN_HASH_SECRET =
      configService.getOrThrow<string>('TOKEN_HASH_SECRET');

    this.USER_SESSION_LIMIT =
      configService.getOrThrow<number>('USER_MAX_SESSIONS') ||
      DEFAULT_MAX_SESSIONS;
  }

  /**
   * Создаёт в БД  запись о новом пользователе.
   * @param dto Данные пользователя.
   * @param passwordHash Хэш пароля.
   * @returns Идентификатор нового пользователя.
   */
  async createNewUser(
    dto: RegisterRequest,
    passwordHash: string,
  ): Promise<Prisma.UserWhereUniqueInput['id']> {
    if (!passwordHash) throw new BadRequestException(ERRORS.auth.wrongId.code);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return user.id;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(ERRORS.register.userExist.code);
        }
      }

      throw error;
    }
  }

  /**
   * Возвращает данные пользователя по идентификатору.
   * @param id Идентификатор пользователя.
   * @returns Если пользователь найден в БД - его данные.
   */
  async getUserDataById(id: string) {
    if (!id) throw new NotFoundException(ERRORS.auth.wrongId.code);

    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        createdAt: true,
        isEmailVerified: true,
        lastSignInAt: true,
      },
    });

    if (!user) throw new NotFoundException(ERRORS.auth.userNotFound.code);

    return user;
  }

  /**
   * Ищет пользователя по Email.
   * @param email E-mail.
   * @returns Идентификатор и хэш.
   */
  async findByEmail(email: string) {
    if (!email) throw new BadRequestException(ERRORS.field.isNotEmail.code);

    return this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true,
      },
    });
  }

  /**
   * Проверка существования записи пользователя в БД по e-mail.
   * @param email E-mail.
   * @returns Да/Нет.
   */
  async isUserExist(email: string): Promise<boolean> {
    const existingUser = await this.findByEmail(email);

    return !!existingUser;
  }

  /**
   * Добавляет токен в БД.
   * @param tokenData Данные токена.
   */
  async saveUserSession(tokenData: TokenData) {
    const { idUser, deviceId, platform, token, expiresAt, deviceInfo } =
      tokenData;
    const hashedToken = customSha256Hash(token, this.TOKEN_HASH_SECRET);

    try {
      await this.prismaService.userToken.upsert({
        where: {
          idUser_deviceId: { idUser, deviceId },
        },
        create: {
          idUser,
          deviceId,
          platform,
          token: hashedToken,
          expiresAt,
          deviceInfo,
        },
        update: {
          token: hashedToken,
          expiresAt,
          deviceInfo,
          platform,
        },
      });

      await this.setSessionLimit(idUser);
    } catch (error: unknown) {
      console.warn(
        '[userService/addUserToken] Ошибка при добавлении токена в БД',
        error,
      );
      throw new InternalServerErrorException(ERRORS.token.createError.code);
    }
  }

  /**
   * Проверяет, что токен есть в БД и сессия не истекла.
   * @param token Токен.
   * @returns Да/Нет.
   */
  async isValidRefreshToken(token: string) {
    const hashedToken = customSha256Hash(token, this.TOKEN_HASH_SECRET);
    const now = new Date();

    const record = await this.prismaService.userToken.findUnique({
      where: { token: hashedToken },
      select: {
        id: true,
        expiresAt: true,
      },
    });

    if (!record) return false;

    // TODO: Эту проверку можно будет убрать,
    // когда будет реализована очистка старых токенов по CRON.
    if (record.expiresAt <= now) {
      await this.deleteUserSession(token);

      return false;
    }

    return true;
  }

  /**
   * Удаляет токен из БД.
   * @param token Токен.
   * @returns
   */
  async deleteUserSession(token: string) {
    const hashedToken = customSha256Hash(token, this.TOKEN_HASH_SECRET);

    try {
      await this.prismaService.userToken.deleteMany({
        where: { token: hashedToken },
      });
    } catch (error: unknown) {
      console.warn(
        '[userService/deleteRefreshToken] Ошибка при удалении токена из БД',
        error,
      );
      throw new InternalServerErrorException(ERRORS.token.deleteError.code);
    }
  }

  /**
   * Удаляет все токены (сессии) пользователя.
   * Используется для кнопки "Выйти со всех устройств".
   * @param idUser Идентификатор пользователя.
   */
  async deleteAllUserSessions(idUser: string) {
    await this.prismaService.userToken.deleteMany({
      where: { idUser },
    });
  }

  /**
   * Обеспечивает максимальный лимит сессий для одного пользователя.
   * @param idUser Идентификатор пользовтаеля.
   */
  async setSessionLimit(idUser: string) {
    const sessions = await this.prismaService.userToken.findMany({
      where: { idUser },
      orderBy: { updatedAt: 'asc' },
      select: { id: true },
    });

    const excess = Math.max(0, sessions.length - this.USER_SESSION_LIMIT);
    const extraSessions = sessions.slice(0, excess);

    if (!extraSessions.length) return;

    const extraSessionsID = extraSessions.map((s) => s.id);

    await this.prismaService.userToken.deleteMany({
      where: {
        id: { in: extraSessionsID },
      },
    });
  }

  /**
   * Удаляет просроченные токены.
   * TODO: Использовать в CRON.
   */
  async deleteExpiredSessions() {
    await this.prismaService.userToken.deleteMany({
      where: {
        expiresAt: { lte: new Date() },
      },
    });
  }
}
