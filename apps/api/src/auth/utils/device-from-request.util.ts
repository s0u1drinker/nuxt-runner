import { BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import {
  DEVICE_ID_HEADER,
  DEVICE_PLATFORM_HEADER,
  UUID_REGEX,
} from '../constants/device.constants';
import { DEVICE_PLATFORM, ERRORS } from 'shared';

/**
 * Информация об устройстве.
 * @param req Request.
 * @returns Идентификкатор, платформа, user-agent.
 */
export function getDeviceContext(req: Request) {
  const deviceId = req.get(DEVICE_ID_HEADER)?.trim();

  if (!deviceId || !UUID_REGEX.test(deviceId)) {
    throw new BadRequestException(ERRORS.auth.invalidDeviceId.code);
  }

  const platform =
    req.get(DEVICE_PLATFORM_HEADER)?.trim() || DEVICE_PLATFORM.web;
  const deviceInfo = req.get('user-agent') || '';

  return { deviceId, platform, deviceInfo };
}
