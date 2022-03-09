import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Student } from "src/entities/students/student";
import { StudentGrade } from "src/entities/students/studentGrade";
import { ValidationResult } from "src/entities/valdiationResult";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { CreateStudentResponse } from "src/request-response/students/createStudent.response";
import { CreateStudentCommand } from "./createStudent.command";
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateStudentCommand)
export class CreateStudentCommandHandler implements ICommandHandler<CreateStudentCommand> 
{
    constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

    async execute(command: CreateStudentCommand): Promise<CreateStudentResponse> 
    {
        var student = this.mapCommandToStudent(command);

        var validationResult = this.validate(student);
        if(false === validationResult.isValid())
        {
            //TODO: Add errors to response
            return new CreateStudentResponse();
        }

        var id = await this.repository.create(student);

        var response = new CreateStudentResponse();
        response.id = id;

        return response;
    }

    private validate(student: Student) : ValidationResult
    {
        //TODO: validate student entity before creation

        var result = new ValidationResult();
        return result;
    }

    private mapCommandToStudent(command: CreateStudentCommand) : Student
    {
        var studentModel = command.student;
        var gradesModel = command.grades;

        var student = new Student();
        student.id = uuidv4();
        student.name = studentModel.name;

        if(gradesModel !== undefined && gradesModel !== null && gradesModel.length > 0)
        {
            var grades = new Array<StudentGrade>();

            gradesModel.forEach(gm => {

                var grade = new StudentGrade();
                grade.courseName = gm.courseName;
                grade.grade = gm.grade;

                grades.push(grade);
            });
        }

        student.grades = grades;

        return student;
    }
}