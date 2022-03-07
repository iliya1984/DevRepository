import { Controller, Dependencies, Get, Inject } from '@nestjs/common';
import { IStudentService } from '../services/students/student.service.interface';
import { GetStudentsByUniversityIdResponse } from '../request-response/students/getStudentsByUniversityIdResponse';
import { StudentService } from 'src/services/students/student.service';
import { CommandBus } from '@nestjs/cqrs';
import { GetStudentsByUniversityIdQuery } from 'src/handlers/students/getStudentsByUniversityIdQuery';

@Controller()
@Dependencies(CommandBus)
export class StudentController 
{
  private commandBus: CommandBus;

  constructor(@Inject('IStudentService')  private readonly studentService: IStudentService, commandBus : CommandBus) 
  {
    if(commandBus == undefined)
    {
      console.log('controller command bus undefined');
    }

    this.commandBus = commandBus;
  }

  @Get("students")
  async getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse> 
  {
    //  var query = new GetStudentsByUniversityIdQuery();
    //  query.universityId = universityId;

    // if(this.commandBus == undefined)
    // {
    //   console.log('command bus undefined');
    // }

    //  var result = await this.commandBus.execute(query);

    //  var response = new GetStudentsByUniversityIdResponse();
    //  response.students = result;
    //  return response;

    return await this.studentService.getStudentsByUniversityId(universityId);
  }
}

