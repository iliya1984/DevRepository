import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AddEnrollmentCommand } from "src/handlers/enrollment/addEnrollment/addEnrollment.command";
import { AddEnrollmentResponse } from "src/request-response/enrollment/addEnrollment.response";

@Controller()
export class EnrollmentController 
{
  constructor(private commandBus: CommandBus) 
  {

  }

  @Post("enroll/:studentId/:universityId") 
  async enroll(@Param() params) : Promise<AddEnrollmentResponse>
  {
    var command = new AddEnrollmentCommand();
    command.studentId = params.studentId;
    command.universityId = params.universityId;
    
    return await this.commandBus.execute(command);
  }
}