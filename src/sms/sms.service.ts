import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
@Injectable()
export class SmsService {
      constructor(private configService: ConfigService) {} 

  findAll() {
    const dbHost = this.configService.get('database.host'); // adicinar .env aqui 
  }
}
   
