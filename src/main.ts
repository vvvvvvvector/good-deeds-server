import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true });

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Good things 🤗').addBearerAuth().build(),
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  await app.listen(3000);
}
bootstrap();
