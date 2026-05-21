import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from '../common/decorators/authorization.decorator';
import { AuthorizedUser } from '../common/decorators/authorizedUser.decorator';
import type { User } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Данные авторизованного пользователя.' })
  me(@AuthorizedUser() user: User) {
    return user;
  }

  @Get(':id')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Данные пользователя по идентификатору.' })
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.getUserDataById(id);
  }
}
