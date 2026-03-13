import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SmsModule } from './sms/sms.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware';

import { NotificacaoModule } from './notificacao/notificacao.module';



@Module({
  imports: [ SmsModule, ConfigModule.forRoot({ 
    isGlobal: true,  cache: true,
  }), 
  ThrottlerModule.forRoot({    
      throttlers: [
        {
          ttl: 60000,  // janela de tempo: 60 segundos (em ms)
          limit: 5,
        }  
    ],
  }), 
  TypeOrmModule.forRootAsync({  // cofiguraçõa do TypeORM connectando com o .env
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
      
    autoLoadEntities: true,
    synchronize: config.get<string>('NODE_ENV') !== 'production',
    logging: true

  })
  }), NotificacaoModule, 
], 

  controllers: [AppController],
  providers: [
    AppService, 
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ]
})

// adicionar middleware sempre fora de @Module

// =============== Middleware de logger  ================

export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')    
  }
} 




//export class AppModule {}
