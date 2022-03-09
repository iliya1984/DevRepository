
import { Body, Controller, Dependencies, Get, HttpCode, Inject, NotImplementedException, Param, Post, ValidationPipe } from '@nestjs/common';
import { GetStudentsByUniversityIdResponse } from '../request-response/students/getStudentsByUniversityId.response';
import { CommandBus } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQuery } from 'src/handlers/students/getByUniversityId/getStudentsByUniversityId.query';
import { CreateStudentResponse } from 'src/request-response/students/createStudent.response';
import { CreateStudentRequest } from 'src/request-response/students/createStudent.request';
import { CreateStudentCommand } from 'src/handlers/students/createStudent/createStudent.command';
import { GetUniversityByIdResponse } from 'src/request-response/universities/getUniveristyById.response';
import { CreateUniversityResponse } from 'src/request-response/universities/createUniversity.response';
import { CreateUniversityRequest } from 'src/request-response/universities/createUniversity.request';
import { CreateUniversityCommand } from 'src/handlers/universities/createUniversity/createUniversity.command';
import { GetUniversityByIdQuery } from 'src/handlers/universities/getById/getUniversityById.query';

@Controller("university")
export class UniversityController 
{
  constructor(private commandBus: CommandBus) 
  {

  }

  @Get(':universityId')
  async getUniversityById(@Param() params): Promise<GetUniversityByIdResponse> 
  {
    var query = new GetUniversityByIdQuery();
    query.universityId = params.universityId;

    return await this.commandBus.execute(query);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() request : CreateUniversityRequest) : Promise<CreateUniversityResponse> 
  {
    var command = new CreateUniversityCommand();
    command.university = request.university;
    
    return await this.commandBus.execute(command);
  }
}

