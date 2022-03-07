import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Student } from 'src/entities/student';
import { GetStudentsByUniversityIdQuery } from 'src/handlers/students/getStudentsByUniversityIdQuery';
import { GetStudentsByUniversityIdResponse } from 'src/request-response/students/getStudentsByUniversityIdResponse';
import { StudentItemModel } from 'src/request-response/students/studentItemModel';
import { IStudentService } from './student.service.interface';

@Injectable()
export class StudentService implements IStudentService 
{
  private commandBus: CommandBus;

  constructor( commandBus : CommandBus)
  {
    if(commandBus == undefined)
    {
      console.log('service command bus undefined');
    }

    this.commandBus = commandBus;
  }

  async getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse>
  {
    var query = new GetStudentsByUniversityIdQuery();
    query.universityId = universityId;

    return await this.commandBus.execute(query);
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
