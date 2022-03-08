import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Student } from "src/entities/student";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { GetStudentsByUniversityIdResponse } from "src/request-response/students/getStudentsByUniversityIdResponse";
import { StudentItemModel } from "src/request-response/students/studentItemModel";
import { GetStudentsByUniversityIdQuery } from "./getStudentsByUniversityIdQuery";

@CommandHandler(GetStudentsByUniversityIdQuery)
export class GetStudentsByUniversityIdQueryHandler implements ICommandHandler<GetStudentsByUniversityIdQuery> 
{
  constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

  async execute(query: GetStudentsByUniversityIdQuery) : Promise<GetStudentsByUniversityIdResponse> {
    
    const universityId = query.universityId;
    
    const students = await this.repository.getStudentsByUniversityId(universityId);

    var response = new GetStudentsByUniversityIdResponse();

    for(var i = 0; i < students.length; i++)
    {
      var model = new StudentItemModel();
      model.name = students[i].name;

      response.students.push(model);
    }


    return response;
  }
}