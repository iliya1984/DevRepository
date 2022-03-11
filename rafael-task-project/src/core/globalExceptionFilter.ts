import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter 
{  
    constructor(private readonly logger : LoggerService)
    { }

    catch(exception: Error, host: ArgumentsHost) 
    {
        this.logger.error(exception.message);
  }
}