import { Controller, Get } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';


@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}


  //teste
  @Get()
  async email() { 
    return await this.notificacaoService.notifica()
    
  }
  
} 
