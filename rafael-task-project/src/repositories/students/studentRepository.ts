import { Student } from "src/entities/student";
import { IStudentRepository } from "./studentRepository.interface";

export class StudentRepository implements IStudentRepository
{
    async getStudentsByUniversityId(universityId: string): Promise<Student[]> {
       
        return await new Promise<Array<Student>>((resolve, reject) => {

            var student = new Student();
            student.firstName = "Ilya";
            student.lastName = "Test";

            var result = new Array<Student>();
            result.push(student);

            resolve(result);
        });
    }
    
}