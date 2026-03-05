import { NestFactory } from '@nestjs/core';
import { 
  SwaggerModule, 
  DocumentBuilder, 
  SwaggerDocumentOptions,
  SwaggerCustomOptions
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API teste sendgrid-twilio')
    .setDescription('API de testes ')
    .setVersion('1.0')
    .addTag('Twilio')
    .build();

  // ✅ SwaggerDocumentOptions — vai no createDocument()
  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  // ✅ SwaggerCustomOptions — vai no setup()
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: 'swagger/json', // ✅ movido para cá também
  };

  const documentFactory = () => 
    SwaggerModule.createDocument(app, config, documentOptions);

  SwaggerModule.setup('api', app, documentFactory, customOptions);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();