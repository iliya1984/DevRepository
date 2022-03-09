import { HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ArgumentOutOfRangeError } from "rxjs";
import { InvalidArgumentException } from "src/entities/errorHandling/invalidArgument.exception";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { EnrollStudentCommand } from "./enrollStudent.command";
import { IUniversityRepository } from "src/repositories/universities/university.repository.interface";
import { ValidationResult } from "src/entities/validation/validationResult";
import { ValidationError } from "src/entities/validation/ValidationError";
import { ErrorCodes } from "src/entities/validation/errorCodes";

@CommandHandler(EnrollStudentCommand)
export class EnrollStudentCommandHandler implements ICommandHandler<EnrollStudentCommand> 
{
    constructor
    (
        @Inject("IStudentRepository") private readonly repository: IStudentRepository,
        @Inject("IUniversityRepository") private readonly universityRepository: IUniversityRepository
    )
    {}

    async execute(command: EnrollStudentCommand): Promise<any>
    {
        var validationResult = await this.ensureValidEnrollment(command);
        if(false == validationResult.isValid())
        {
            //TODO: return invalid response
        }
        
        await this.repository.enroll(command.studentId, command.universityId);
    }

    private async ensureValidEnrollment(command : EnrollStudentCommand) : Promise<ValidationResult>
    {
        const errorMessage : string = 'Unable to enroll a student.';
        
        if(command.studentId == undefined || command.studentId == null || command.studentId == '')
        {
            throw new InvalidArgumentException(errorMessage, { name : 'studentId', isEmpty : true });
        }

        if(command.universityId == undefined || command.universityId == null || command.universityId == '')
        {
            throw new InvalidArgumentException(errorMessage, { name : 'universityId', isEmpty : true });
        }

        var student = await this.repository.getById(command.studentId);

        if(student == null)
        {
            throw new NotFoundException(errorMessage + ' Student with ID: "' + command.studentId + '" was not found');
        }

        var university = await this.universityRepository.getById(command.universityId);

        if(university == null)
        {
            throw new NotFoundException(errorMessage + ' University with ID: "' + command.universityId + '" was not found');
        }

        var validationResult = new ValidationResult();

        var enrolledStudents = await this.repository.getStudentsByUniversityId(university.id);
        var numberOfStudents = enrolledStudents.length;

        var studentCapacity = university.maxNumberOfStudents - numberOfStudents;
        if(studentCapacity < 1)
        {
            var error = new ValidationError();
            error.errorCode = ErrorCodes.EnrollmentError_UniversityMaxCapacityReached;
            error.errorMessage = errorMessage + ' Reason: University max capacity is reached';

            validationResult.errors.push(error);

            return validationResult;
        }
        

        return validationResult;
    }
}