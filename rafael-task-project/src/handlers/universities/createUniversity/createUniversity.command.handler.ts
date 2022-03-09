import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { University } from "src/entities/universities/university";
import { EntityValidationResult } from "src/entities/validation/entityValdiationResult";
import { IUniversityRepository } from "src/repositories/universities/university.repository.interface";
import { CreateUniversityResponse } from "src/request-response/universities/createUniversity.response";
import { CreateUniversityCommand } from "./createUniversity.command";
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateUniversityCommand)
export class CreateUniversityCommandHandler implements ICommandHandler<CreateUniversityCommand> 
{
    constructor(@Inject("IUniversityRepository") private readonly repository: IUniversityRepository) {}

    async execute(command: CreateUniversityCommand): Promise<CreateUniversityResponse> 
    {
        var university = this.mapCommandToUniversity(command);

        var validationResult = this.validate(university);
        if(false === validationResult.isValid())
        {
            //TODO: Add errors to response
            return new CreateUniversityResponse();
        }

        var id = await this.repository.create(university);

        var response = new CreateUniversityResponse();
        response.id = id;

        return response;
    }

    private validate(university: University) : EntityValidationResult
    {
        //TODO: validate university entity before creation

        var result = new EntityValidationResult();
        return result;
    }

    private mapCommandToUniversity(command: CreateUniversityCommand) : University
    {
        var universityModel = command.university;

        var university = new University();
        university.id = uuidv4();
        university.name = universityModel.name;
        university.maxNumberOfStudents = universityModel.maxNumberOfStudents;
        university.minGPA = universityModel.minGPA;

        return university;
    }
}