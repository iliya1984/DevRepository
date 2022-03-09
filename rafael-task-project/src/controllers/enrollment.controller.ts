import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { EnrollStudentCommand } from "src/handlers/enrollment/addEnrollment/enrollStudent.command";

@Controller()
export class EnrollmentController 
{
  constructor(private commandBus: CommandBus) 
  {

  }

  
  @HttpCode(204)
  @Post("enroll/:studentId/:universityId") 
  async enroll(@Param() params) : Promise<void>
  {
    var command = new EnrollStudentCommand();
    command.studentId = params.studentId;
    command.universityId = params.universityId;
    
    return await this.commandBus.execute(command);
  }
}