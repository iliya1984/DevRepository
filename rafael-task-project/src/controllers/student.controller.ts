import { Body, Controller, Dependencies, Get, HttpCode, Inject, Param, Post, ValidationPipe } from '@nestjs/common';
import { GetStudentsByUniversityIdResponse } from '../request-response/students/getStudentsByUniversityId.response';
import { CommandBus } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQuery } from 'src/handlers/students/getByUniversityId/getStudentsByUniversityId.query';
import { CreateStudentResponse } from 'src/request-response/students/createStudent.response';
import { CreateStudentRequest } from 'src/request-response/students/createStudent.request';
import { CreateStudentCommand } from 'src/handlers/students/createStudent/createStudent.command';
import { EnrollStudentCommand } from 'src/handlers/students/enrollStudent/enrollStudent.command';

@Controller()
export class StudentController 
{
  constructor(private commandBus: CommandBus) 
  {

  }

  @Get("students")
  async getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse> 
  {
    var query = new GetStudentsByUniversityIdQuery();
    query.universityId = universityId;

    return await this.commandBus.execute(query);
  }

  @HttpCode(201)
  @Post("student")
  async create(@Body() request : CreateStudentRequest) : Promise<CreateStudentResponse> 
  {
    var command = new CreateStudentCommand();
    command.student = request.student;
    command.grades = request.grades;
    
    return await this.commandBus.execute(command);
  }

  @HttpCode(204)
  @Post("enroll/:studentId/:universityId") 
  async enroll(@Param() params) : Promise<void>
  {
    var command = new EnrollStudentCommand();
    command.studentId = params.studentId;
    command.universityId = params.universityId;
    
    return await this.commandBus.execute(command);
  }
}

