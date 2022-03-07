import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from "src/entities/student";
import { IStudentRepository } from "./student.repository.interface";
import { StudentDocument } from "./student.schema";

export class StudentRepository implements IStudentRepository
{
    constructor(@InjectModel('StudentDocument') private studentModel: Model<StudentDocument>) {}

    async getStudentsByUniversityId(universityId: string): Promise<Student[]> {
       
        var documents = await this.studentModel.find<StudentDocument>().exec();

        var students = new Array<Student>();
        for(var i = 0; i < documents.length; i++)
        {
            var student = new Student();
            student.firstName = documents[i].firstName;
            student.lastName = documents[i].lastName;

            students.push(student);
        }

        return students;
    }
    
}

