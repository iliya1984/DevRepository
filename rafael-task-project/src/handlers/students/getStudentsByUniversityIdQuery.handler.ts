import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Student } from "src/entities/student";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { GetStudentsByUniversityIdQuery } from "./getStudentsByUniversityIdQuery";

@CommandHandler(GetStudentsByUniversityIdQuery)
export class GetStudentsByUniversityIdQueryHandler implements ICommandHandler<GetStudentsByUniversityIdQuery> 
{
  constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

  async execute(query: GetStudentsByUniversityIdQuery) : Promise<Array<Student>> {
    
    const universityId = query.universityId;
    
    const students = await this.repository.getStudentsByUniversityId(universityId);

    return students;
  }
}