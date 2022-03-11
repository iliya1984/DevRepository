import { Body, Controller, Dependencies, Get, HttpCode, HttpStatus, Inject, LoggerService, Param, Post, Res, ValidationPipe } from '@nestjs/common';
import { GetStudentsByUniversityIdResponse } from '../request-response/students/getStudentsByUniversityId.response';
import { CommandBus } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQuery } from 'src/handlers/students/getByUniversityId/getStudentsByUniversityId.query';
import { CreateStudentResponse } from 'src/request-response/students/createStudent.response';
import { CreateStudentRequest } from 'src/request-response/students/createStudent.request';
import { CreateStudentCommand } from 'src/handlers/students/createStudent/createStudent.command';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class StudentController 
{
  constructor(private commandBus: CommandBus, @Inject("ILogger") private logger : LoggerService) 
  {

  }

  @Get("students/:universityId")
  async getStudentsByUniversityId(@Param() params): Promise<GetStudentsByUniversityIdResponse> 
  {
    this.logger.error('test error');

    var query = new GetStudentsByUniversityIdQuery();
    query.universityId = params.universityId;

    return await this.commandBus.execute(query);
  }

  @Post("student")
  async create(@Body() request : CreateStudentRequest, @Res() response: Response) : Promise<void> 
  {
    var command = new CreateStudentCommand();
    command.student = request.student;
    command.grades = request.grades;
    
    var result = await this.commandBus.execute(command);

    var httpStatus = (<CreateStudentResponse>result).errors.length > 0 
      ? HttpStatus.UNPROCESSABLE_ENTITY : HttpStatus.CREATED;

    response
      .status(httpStatus)
      .json(result);
  }
}

