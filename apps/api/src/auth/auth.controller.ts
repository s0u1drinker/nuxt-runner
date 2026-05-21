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
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { ERRORS } from 'shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('guest')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход для гостей (без аутентификации).' })
  async guestAccess(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    return await this.authService.guestAccess(req, res);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация нового пользователя.' })
  @ApiConflictResponse({ description: ERRORS.register.userExist.message })
  @ApiBadRequestResponse({ description: ERRORS.register.createError.message })
  async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ): Promise<AuthResponse> {
    return await this.authService.registerNewUser(req, res, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход пользователя на сайт.' })
  @ApiUnauthorizedResponse({ description: ERRORS.auth.invalidData.message })
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ): Promise<AuthResponse> {
    return await this.authService.login(req, res, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновление JWT-токенов.' })
  @ApiUnauthorizedResponse({
    description: ERRORS.auth.invalidRefreshToken.message,
  })
  @ApiNotFoundResponse({ description: ERRORS.auth.userNotFound.message })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    return await this.authService.refreshUserTokens(req, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Выход пользователя из системы.' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req, res);
  }
}
