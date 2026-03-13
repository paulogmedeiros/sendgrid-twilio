import { Module } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule],
  controllers: [NotificacaoController],
  providers: [NotificacaoService, EmailService],
})
export class NotificacaoModule {}
