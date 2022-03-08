import { Student } from "src/entities/students/student";

export interface IStudentRepository
{
    getStudentsByUniversityId(universityId: string) : Promise<Array<Student>>;
    create(student: Student) : Promise<string>;
}