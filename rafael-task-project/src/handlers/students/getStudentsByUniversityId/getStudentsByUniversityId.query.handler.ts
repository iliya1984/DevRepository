import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Student } from "src/entities/student";
import { StudentGrade } from "src/entities/studentGrade";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { GetStudentsByUniversityIdResponse } from "src/request-response/students/getStudentsByUniversityId.response";
import { StudentGradeModel } from "src/request-response/students/studentGrade.model";
import { StudentItemModel } from "src/request-response/students/studentItem.model";
import { GetStudentsByUniversityIdQuery } from "./getStudentsByUniversityId.query";

@CommandHandler(GetStudentsByUniversityIdQuery)
export class GetStudentsByUniversityIdQueryHandler implements ICommandHandler<GetStudentsByUniversityIdQuery> 
{
  constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

  async execute(query: GetStudentsByUniversityIdQuery) : Promise<GetStudentsByUniversityIdResponse> {
    
    const universityId = query.universityId;
    
    const students = await this.repository.getStudentsByUniversityId(universityId);

    var response = new GetStudentsByUniversityIdResponse();

    if(students != undefined && students != null && students.length > 0)
    {
      students.forEach(student =>
      {
        var model = this.mapStudentToDto(student);
        response.students.push(model);
      });
    }

    return response;
  }

  private mapStudentToDto(student: Student) : StudentItemModel
  {
    var model = new StudentItemModel();
    model.id = student.id;
    model.name = student.name;

    if(student.grades != undefined && student.grades != null && student.grades.length > 0)
    {
      student.grades.forEach(grade =>
      {
        var gradeModel = this.mapGradeToDto(grade);
        model.grades.push(gradeModel);
      });
    }

    return model;
  }

  private mapGradeToDto(grade: StudentGrade) : StudentGradeModel
  {
    var gradeModel = new StudentGradeModel();
    gradeModel.courseName = grade.courseName;
    gradeModel.grade = grade.grade;

    return gradeModel;
  }
}