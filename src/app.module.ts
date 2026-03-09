import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EmailModule, SmsModule, ConfigModule.forRoot({ 
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
  TypeOrmModule.forRootAsync({ 
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
  })
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

export class AppModule {}
