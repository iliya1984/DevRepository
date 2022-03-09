import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ArgumentOutOfRangeError } from "rxjs";
import { InvalidArgumentException } from "src/entities/errorHandling/invalidArgument.exception";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { EnrollStudentCommand } from "./enrollStudent.command";
import { validator } from 'validator';

@CommandHandler(EnrollStudentCommand)
export class EnrollStudentCommandHandler implements ICommandHandler<EnrollStudentCommand> 
{
    constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

    async execute(command: EnrollStudentCommand): Promise<any>
    {
        this.ensureValidEnrollment(command);

        await this.repository.enroll(command.studentId, command.universityId);
    }

    private ensureValidEnrollment(command : EnrollStudentCommand)
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


    }
}