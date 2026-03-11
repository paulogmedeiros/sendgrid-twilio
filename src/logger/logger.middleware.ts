import { Injectable, NestMiddleware, Logger} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express'


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
     
    const { method, originalUrl } = req;
    const inicio = Date.now();

    // executa DEPOIS que a resposta for enviada
    res.on('finish', () => {
      const { statusCode } = res;
      const tempo = Date.now() - inicio;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${tempo}ms`
      );
    });



    next();
  }
}

// estrutura do codigo middleware 
 // 1- gerar pasta e arquivo midlleware 
 // 2- Adicionar estrutura basica do middleware 
 // 3- Importar midleware no appModulo 
 //4- adicionar codigo com a  aplicação desejada  no middleware 