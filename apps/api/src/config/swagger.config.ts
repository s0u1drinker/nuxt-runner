import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('NuxtRunner')
    .setDescription('API documentation for NuxtRunner')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
