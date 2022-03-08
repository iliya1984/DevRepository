import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Student } from "src/entities/students/student";
import { StudentGrade } from "src/entities/students/studentGrade";
import { University } from "src/entities/universities/university";
import { IUniversityRepository } from "src/repositories/universities/university.repository.interface";
import { GetStudentsByUniversityIdResponse } from "src/request-response/students/getStudentsByUniversityId.response";
import { StudentGradeModel } from "src/request-response/students/studentGrade.model";
import { StudentItemModel } from "src/request-response/students/studentItem.model";
import { GetUniversityByIdResponse } from "src/request-response/universities/getUniveristyById.response";
import { UniversityItemModel } from "src/request-response/universities/universityItem.model";
import { GetUniversityByIdQuery } from "./getUniversityById.query";

@CommandHandler(GetUniversityByIdQuery)
export class GetUniversityByIdQueryHandler implements ICommandHandler<GetUniversityByIdQuery> 
{
  constructor(@Inject("IUniversityRepository") private readonly repository: IUniversityRepository) {}

  async execute(query: GetUniversityByIdQuery) : Promise<GetUniversityByIdResponse> {
    
    const universityId = query.universityId;
    
    const university = await this.repository.getById(universityId);

    var response = new GetUniversityByIdResponse();

    if(university != undefined && university != null)
    {
        response.university = this.mapUniversityToDto(university);
    }

    return response;
  }

  private mapUniversityToDto(university: University) : UniversityItemModel
  {
    var model = new UniversityItemModel();
    model.id = university.id;
    model.name = university.name;
    model.maxNumberOfStudents = university.maxNumberOfStudents;
    model.minGPA = university.minGPA;

    return model;
  }
}