import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { ERRORS } from 'shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход для гостей (без аутентификации).' })
  @Get('guest')
  authGuest(@Req() request: Request) {
    return `Guest access is not ready. User-Agent: ${JSON.stringify(request.headers['user-agent'])}`;
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя.' })
  @ApiOkResponse({ type: AuthResponse })
  @ApiConflictResponse({ description: ERRORS.register.userExist.message })
  @ApiBadRequestResponse({ description: ERRORS.register.createError.message })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.registerNewUser(req, res, dto);
  }

  @ApiOperation({ summary: 'Вход пользователя на сайт.' })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: ERRORS.auth.invalidData.message })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(req, res, dto);
  }

  @ApiOperation({ summary: 'Обновление JWT-токенов.' })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({
    description: ERRORS.auth.invalidRefreshToken.message,
  })
  @ApiNotFoundResponse({ description: ERRORS.auth.userNotFound.message })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshUserTokens(req, res);
  }

  @ApiOperation({ summary: 'Выход пользователя из системы.' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req, res);
  }
}
