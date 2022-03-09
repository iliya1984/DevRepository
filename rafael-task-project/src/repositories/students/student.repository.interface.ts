import { Student } from "src/entities/students/student";

export interface IStudentRepository
{
    getStudentsByUniversityId(universityId: string) : Promise<Array<Student>>;
    getById(studentId : string) : Promise<Student>;
    create(student: Student) : Promise<string>;
    enroll(studentId : string, universityId : string) : Promise<boolean>;
}