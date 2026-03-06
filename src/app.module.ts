import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';
import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [EmailModule, SmsModule, ConfigModule.forRoot({ 
    isGlobal: true,  cache: true,
  }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
