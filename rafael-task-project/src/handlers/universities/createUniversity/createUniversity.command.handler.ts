import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUniversityCommand } from "./createUniversity.command";

@CommandHandler(CreateUniversityCommand)
export class CreateUniversityCommandHandler implements ICommandHandler<CreateUniversityCommand> 
{
    async execute(command: CreateUniversityCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }

}