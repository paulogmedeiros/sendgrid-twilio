import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';



@Injectable()
export class NotificacaoService {
  

    constructor(private readonly emailServiceInstace: EmailService){}

    async notifica() {
        await this.emailServiceInstace.sendEmail()
    }
}

