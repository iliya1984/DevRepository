import { Inject, Injectable, LoggerService, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware 
{
  constructor(@Inject('ILogger') private readonly logger : LoggerService)
  {

  }

  use(req: Request, res: Response, next: NextFunction) 
  {
    var requestMessage = this.createRequestMessage(req);
    this.logger.log(requestMessage);

    res.on('close', () => {
      
      var responseMessage = this.createResponseMessage(req, res);
      this.logger.log(responseMessage);
    });


    next();
  }

  private createRequestMessage(req : Request) 
  {
    var url = req.url;
    var method = req.method;
    var message = `Request recieved. Method=${method}, URL=${url}`;

    return message;
  }

  private createResponseMessage(req : Request, res: Response)
  {
    var statusCode = res.statusCode;
    var statusMessage = res.statusMessage;
    var url = req.url;
    var method = req.method;
    var message = `Response returned. Method=${method}, URL=${url}, StatusCode=${statusCode}, StatusMessage=${statusMessage}`;

    return message;
  }
}
