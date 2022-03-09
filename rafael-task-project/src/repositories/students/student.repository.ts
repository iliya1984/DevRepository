import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Student } from "src/entities/students/student";
import { StudentGrade } from 'src/entities/students/studentGrade';
import { IStudentRepository } from "./student.repository.interface";
import { StudentDocument, StudentGradeDocument } from "./student.schema";

export class StudentRepository implements IStudentRepository
{
    constructor
    (
        @InjectModel('StudentDocument') private studentModel: Model<StudentDocument>,
        @InjectConnection() private readonly connection: mongoose.Connection
        ) 
    {

    }
    
    
    async enroll(studentId: string, universityId: string, maxNumberOfStudents: number): Promise<boolean> {
        
        const session = await this.connection.startSession();
 
        session.startTransaction();
        try 
        {
            var enrolledStudents = await this.studentModel
                .find<StudentDocument>({ where: { universityId : universityId }})
                .session(session)
                .exec();
            
            if(enrolledStudents.length >= maxNumberOfStudents)
            {
                session.abortTransaction();
                return false;
            }

            if(enrolledStudents.length )

            var student = await this.studentModel
                .findOne<StudentDocument>({ where: { id : studentId }})
                .session(session)
                .exec();

            if(!student)
            {
                session.abortTransaction();
                return false;
            }
    
            var result : boolean = false;
            student.universityId = universityId;

            await student.save({ session : session }, error =>
            {
                if(!error)
                {
                    result = true;
                }
            });
            
            if(!result)
            {
                session.abortTransaction();
                return false;
            }

            await session.commitTransaction();
            return true;
        } 
        catch (error) 
        {
          await session.abortTransaction();
          throw error;
        } 
        finally 
        {
          session.endSession();
        }
    }
    
    async create(student: Student): Promise<string> {
        
        const createdStudent = new this.studentModel(student);
        await createdStudent.save();

        return student.id;
    }

    async getById(studentId: string): Promise<Student> {
       
        var document = await this.studentModel.findOne<StudentDocument>({ where: { id : studentId }}).exec();

        if(document == undefined || document == null)
        {
            return null;
        }

        return this.mapDocumentToStudent(document);
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

