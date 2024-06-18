import { AppConfigService } from './config/app/config.service';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set global prefix for all routes (e.g. /api/v3)
  app.setGlobalPrefix('api/v3');

  const appConfig: AppConfigService = app.get(AppConfigService);

  // set global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  // CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // allowedHeaders: 'Content-Type, Accept',
  });

  // Swagger
  const openAPIConfig = new DocumentBuilder()
    .setTitle(appConfig.name || 'NestJS API')
    .setDescription('The API description')
    .addBearerAuth()
    .setVersion('3.0')
    .build();

  const document = SwaggerModule.createDocument(app, openAPIConfig);

  SwaggerModule.setup('api/v3', app, document);

  // init firebase admin
  const adminConfig: ServiceAccount = {
    "projectId": appConfig.firebase?.projectId || '',
    "privateKey": appConfig.firebase.privateKey.replace(/\\n/g, '\n'),
    "clientEmail": appConfig.firebase.clientEmail,
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  await app.listen(appConfig.port || 8000, () => {
    Logger.log(`Server running on http://localhost:${appConfig.port}`, 'Bootstrap');
  });
}
bootstrap();
