import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from "src/entities/student";
import { IStudentRepository } from "./student.repository.interface";
import { StudentDocument } from "./student.schema";

export class StudentRepository implements IStudentRepository
{
    constructor(@InjectModel('StudentDocument') private studentModel: Model<StudentDocument>) {}
    
    async create(student: Student): Promise<string> {
        
        const createdStudent = new this.studentModel(student);
        await createdStudent.save();

        return student.id;
    }

    async getStudentsByUniversityId(universityId: string): Promise<Student[]> {
       
        var documents = await this.studentModel.find<StudentDocument>().exec();

        var students = new Array<Student>();
        for(var i = 0; i < documents.length; i++)
        {
            var student = new Student();
            student.name = documents[i].name;

            students.push(student);
        }

        return students;
    }
    
}

