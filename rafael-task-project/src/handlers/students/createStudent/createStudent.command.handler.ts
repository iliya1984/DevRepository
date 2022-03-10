import { HttpCode, HttpException, HttpStatus, Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Student } from "src/entities/students/student";
import { StudentGrade } from "src/entities/students/studentGrade";
import { EntityValidationResult } from "src/entities/validation/entityValdiationResult";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { CreateStudentResponse } from "src/request-response/students/createStudent.response";
import { CreateStudentCommand } from "./createStudent.command";
import { v4 as uuidv4 } from 'uuid';
import { StudentGradeList } from "src/entities/students/studentGradeList";
import { validate } from 'class-validator';
import { PropertyValidationError } from "src/entities/validation/propertyValidationError";
import { PropertyValidationErrorListModel } from "src/request-response/validation/propertyValidationErrorListModel";

@CommandHandler(CreateStudentCommand)
export class CreateStudentCommandHandler implements ICommandHandler<CreateStudentCommand> 
{
    constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

    async execute(command: CreateStudentCommand): Promise<CreateStudentResponse> 
    {
        var response = new CreateStudentResponse();
        var student = this.mapCommandToStudent(command);

        var validationResult = this.validate(student);
        if(false === validationResult.isValid())
        {
           response.errors = this.mapErrors(validationResult);
           return response;
        }

        var id = await this.repository.create(student);

        response.id = id;

        return response;
    }

    private validate(student: Student) : EntityValidationResult
    {
        var result = new EntityValidationResult();

        if(student.id == undefined || student.id == null || student.id == '')
        {
            throw new InternalServerErrorException('Unable to create student entity. ID was not set');
        }

        if(student.name == undefined || student.name == '')
        {
            var error = new PropertyValidationError();
            error.propertyName = 'name';
            error.errorMessage = 'Student "name" is required field';

            result.errors.push(error);
        }

        return result;
    }

    private mapErrors(validationResult: EntityValidationResult) : PropertyValidationErrorListModel
    {
        var errorListModel = new PropertyValidationErrorListModel();

        validationResult.errors.forEach(e =>
        {
            errorListModel.add(e.propertyName, e.errorMessage);
        });

        return errorListModel;
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
            var grades = new StudentGradeList();

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