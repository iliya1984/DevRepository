import { Inject, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { University } from "src/entities/universities/university";
import { EntityValidationResult } from "src/entities/validation/entityValdiationResult";
import { IUniversityRepository } from "src/repositories/universities/university.repository.interface";
import { CreateUniversityResponse } from "src/request-response/universities/createUniversity.response";
import { CreateUniversityCommand } from "./createUniversity.command";
import { v4 as uuidv4 } from 'uuid';
import { PropertyValidationError } from "src/entities/validation/propertyValidationError";
import { PropertyValidationErrorListModel } from "src/request-response/validation/propertyValidationErrorListModel";

@CommandHandler(CreateUniversityCommand)
export class CreateUniversityCommandHandler implements ICommandHandler<CreateUniversityCommand> 
{
    constructor(@Inject("IUniversityRepository") private readonly repository: IUniversityRepository) {}

    async execute(command: CreateUniversityCommand): Promise<CreateUniversityResponse> 
    {
        var response = new CreateUniversityResponse();
        var university = this.mapCommandToUniversity(command);

        var validationResult = this.validate(university);
        if(false === validationResult.isValid())
        {
            response.errors = this.mapErrors(validationResult);
            return response;
        }

        var id = await this.repository.create(university);

      
        response.id = id;

        return response;
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

    private validate(university: University) : EntityValidationResult
    {
        var result = new EntityValidationResult();

        if(university.id == undefined || university.id == null || university.id == '')
        {
            throw new InternalServerErrorException('Unable to create university entity. ID was not set');
        }

        if(university.name == undefined || university.name == '')
        {
            var error = new PropertyValidationError();
            error.propertyName = 'name';
            error.errorMessage = 'University "name" is required field';

            result.errors.push(error);
        }

        if(university.maxNumberOfStudents == undefined)
        {
            var error = new PropertyValidationError();
            error.propertyName = 'maxNumberOfStudents';
            error.errorMessage = 'University "maxNumberOfStudents" is required field';

            result.errors.push(error);
        }
        else if(university.maxNumberOfStudents <= 0)
        {
            var error = new PropertyValidationError();
            error.propertyName = 'maxNumberOfStudents';
            error.errorMessage = 'University "maxNumberOfStudents" value must be greater than zero';

            result.errors.push(error);
        }

        if(university.minGPA == undefined)
        {
            var error = new PropertyValidationError();
            error.propertyName = 'minGPA';
            error.errorMessage = 'University "minGPA" is required field';

            result.errors.push(error);
        }
        else if(university.minGPA <= 0)
        {
            var error = new PropertyValidationError();
            error.propertyName = 'minGPA';
            error.errorMessage = 'University "minGPA" value must be greater than zero';

            result.errors.push(error);
        }

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