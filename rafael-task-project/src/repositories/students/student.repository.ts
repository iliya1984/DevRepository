import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from "src/entities/students/student";
import { StudentGrade } from 'src/entities/students/studentGrade';
import { IStudentRepository } from "./student.repository.interface";
import { StudentDocument, StudentGradeDocument } from "./student.schema";

export class StudentRepository implements IStudentRepository
{
    constructor(@InjectModel('StudentDocument') private studentModel: Model<StudentDocument>) {}
    enroll(studentId: string, universityId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async create(student: Student): Promise<string> {
        
        const createdStudent = new this.studentModel(student);
        await createdStudent.save();

        return student.id;
    }

    async getStudentsByUniversityId(universityId: string): Promise<Student[]> {
       
        var documents = await this.studentModel.find<StudentDocument>().exec();

        var students = new Array<Student>();

        documents.forEach(document =>{

            var student = this.mapDocumentToStudent(document);
            students.push(student);
        });

        return students;
    }

    private mapDocumentToStudent(document : StudentDocument) : Student
    {
        var student = new Student();
        student.id = document.id;
        student.name = document.name;

        if(document.grades !== undefined && document.grades !== null && document.grades.length > 0)
        {
            document.grades.forEach(gradeDocument =>
            {
                var grade = this.mapDocumentToGrade(gradeDocument);
                student.grades.push(grade);
            });
        }

        return student;
    }
    
    private mapDocumentToGrade(document : StudentGradeDocument) : StudentGrade
    {
        var grade = new StudentGrade();
        grade.courseName = document.courseName;
        grade.grade = document.grade;

        return grade;
    }
}

