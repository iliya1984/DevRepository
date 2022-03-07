import { Injectable } from '@nestjs/common';
import { GetStudentsByUniversityIdResponse } from 'src/request-response/students/getStudentsByUniversityIdResponse';
import { StudentItemModel } from 'src/request-response/students/studentItemModel';
import { IStudentService } from './istudent.service';

@Injectable()
export class StudentService implements IStudentService 
{
  
  async getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse>
  {
      var student = new StudentItemModel();
      student.firstName = "Ilya";
      student.lastName = "Test";

      var response = new GetStudentsByUniversityIdResponse();

      response.students.push(student);

      return response;
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
