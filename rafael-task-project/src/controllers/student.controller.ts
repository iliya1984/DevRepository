import { Controller, Get } from '@nestjs/common';
import { IStudentService } from '../services/students/istudent.service';
import { GetStudentsByUniversityIdResponse } from '../request-response/students/getStudentsByUniversityIdResponse';
import { StudentService } from 'src/services/students/student.service';

@Controller()
export class StudentController 
{
  constructor(private readonly studentService: StudentService) {}

  @Get("students")
  async getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse> 
  {
    return await this.studentService.getStudentsByUniversityId(universityId);
  }
}

