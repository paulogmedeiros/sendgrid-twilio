import { NestFactory } from '@nestjs/core';
import {                                         
  SwaggerModule,  
  DocumentBuilder,                                   // Swagger 
  SwaggerDocumentOptions,
  SwaggerCustomOptions
} from '@nestjs/swagger';                       
import { AppModule } from './app.module';              
import { ValidationPipe } from '@nestjs/common';  


async function bootstrap() {
  
  
  const app = await NestFactory.create(AppModule, {          // Configurações do logger - Global - metodos permitidos
    logger: ['log','error','warn','debug','verbose'], 
  });

  const config = new DocumentBuilder()     // descrição do swagger 
    .setTitle('API teste sendgrid-twilio')
    .setDescription('API de testes ')
    .setVersion('1.0')
    .addTag('Twilio')
    .build();

  // ✅ SwaggerDocumentOptions — vai no createDocument() 
  const documentOptions: SwaggerDocumentOptions = {    // configuração de documento do swagger 
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  // ✅ SwaggerCustomOptions — vai no setup()
  const customOptions: SwaggerCustomOptions = {               //configuração visual do swagger
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: 'swagger/json', // ✅ movido para cá também
  };


  const documentFactory = () =>                                     // ativação da configuração SwaggerDocumentOptions do swagger
    SwaggerModule.createDocument(app, config, documentOptions);

  SwaggerModule.setup('api', app, documentFactory, customOptions); // ativação da configuração SwaggerCustomOptions do swagger

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();