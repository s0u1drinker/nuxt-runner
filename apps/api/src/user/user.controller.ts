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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserData() {
    return 'Where is user ID?';
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@AuthorizedUser() user: User) {
    return user;
  }

  @Authorization()
  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.getUserDataById(id);
  }
}
