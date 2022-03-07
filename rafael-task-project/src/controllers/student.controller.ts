import { Controller, Dependencies, Get, Inject } from '@nestjs/common';
import { GetStudentsByUniversityIdResponse } from '../request-response/students/getStudentsByUniversityIdResponse';
import { CommandBus } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQuery } from 'src/handlers/students/getStudentsByUniversityIdQuery';

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
}

