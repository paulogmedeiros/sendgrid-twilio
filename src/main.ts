import { NestFactory } from '@nestjs/core';
import {                                         
  SwaggerModule,  
  DocumentBuilder,                                   // Swagger 
  SwaggerDocumentOptions,
  SwaggerCustomOptions
} from '@nestjs/swagger';                       
import { AppModule } from './app.module';              
import { ValidationPipe } from '@nestjs/common';  
import { Logger } from '@nestjs/common';


async function bootstrap() {
  
  
  const app = await NestFactory.create(AppModule, {          
    logger: ['log','error','warn','debug','verbose'], // Configurações do logger - Global - metodos permitidos
  });



//========================= Swagger config ===============================


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
 
  // await app.listen(process.env.PORT ?? 3000);

  
//================== CORS ================================
  
app.enableCors({
  origin: '',
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
});




// =================== Logger principais ==============================




 const logger = new Logger('Server'); 
 const swaggerlogger = new Logger('Swagger')
 const bancoLogger = new Logger('Banco')
  
 const PORT = process.env.PORT ?? 3000
 await app.listen(PORT);
  
 const swagger = `http://localhost:${PORT}/api`  
 const banco = process.env.DB_DATABASE
  
  logger.log(`🚀 Servidor rodando em http://localhost:${PORT}`) 
  bancoLogger.log(`Base de dados :  ${banco}`) 
  swaggerlogger.log(`Documentação da Api rodando em : ${swagger}`)
 
}

bootstrap();