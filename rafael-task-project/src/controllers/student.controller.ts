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
  constructor(@Inject('IStudentService')  private readonly studentService: IStudentService) 
  {
  }

  @Get("students")
  async getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse> 
  {
    return await this.studentService.getStudentsByUniversityId(universityId);
  }
}

