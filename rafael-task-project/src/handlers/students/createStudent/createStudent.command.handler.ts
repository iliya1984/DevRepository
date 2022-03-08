import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IStudentRepository } from "src/repositories/students/student.repository.interface";
import { CreateStudentResponse } from "src/request-response/students/createStudent.response";
import { CreateStudentCommand } from "./createStudent.command";

@CommandHandler(CreateStudentCommand)
export class CreateStudentCommandHandler implements ICommandHandler<CreateStudentCommand> 
{
    constructor(@Inject("IStudentRepository") private readonly repository: IStudentRepository) {}

    async execute(command: CreateStudentCommand): Promise<CreateStudentResponse> 
    {
        throw new Error("Method not implemented.");
    }

}