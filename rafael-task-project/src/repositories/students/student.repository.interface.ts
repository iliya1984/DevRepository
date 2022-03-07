import { Student } from "src/entities/student";

export interface IStudentRepository
{
    getStudentsByUniversityId(universityId: string) : Promise<Array<Student>>;
}