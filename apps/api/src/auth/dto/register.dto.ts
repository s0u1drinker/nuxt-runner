import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { getFieldErrorMessage } from 'shared';
import {
  ERRORS,
  FIELDS,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from 'shared';

export class RegisterRequest {
  @ApiProperty({
    description: 'Почтовый адрес',
    example: 'example@google.com',
  })
  @IsNotEmpty({
    message: getFieldErrorMessage(FIELDS.email, ERRORS.field.isEmpty.message),
  })
  @IsString({
    message: getFieldErrorMessage(
      FIELDS.email,
      ERRORS.field.isNotString.message,
    ),
  })
  @IsEmail({}, { message: ERRORS.field.isNotEmail.message })
  email: string = '';

  @ApiProperty({
    description: 'Пароль',
    example: 'qwerty123',
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
  })
  @IsNotEmpty({
    message: getFieldErrorMessage(
      FIELDS.password,
      ERRORS.field.isEmpty.message,
    ),
  })
  @IsString({
    message: getFieldErrorMessage(
      FIELDS.password,
      ERRORS.field.isNotString.message,
    ),
  })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: ERRORS.field.passwordMinLength.message,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: ERRORS.field.passwordMaxLength.message,
  })
  password: string = '';

  @ApiProperty({
    description: 'Имя',
    example: 'John',
  })
  @IsNotEmpty({
    message: getFieldErrorMessage(
      FIELDS.firstName,
      ERRORS.field.isEmpty.message,
    ),
  })
  @IsString({ message: ERRORS.field.isNotString.message })
  firstName: string = '';

  @ApiProperty({
    description: 'Фамилия',
    example: 'Blacksmith',
    required: false,
  })
  @IsString({ message: ERRORS.field.isNotString.message })
  lastName: string = '';
}
