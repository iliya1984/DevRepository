import { Controller, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AddEnrollmentCommand } from "src/handlers/enrollment/addEnrollment/addEnrollment.command";
import { AddEnrollmentResponse } from "src/request-response/enrollment/addEnrollment.response";
import { Response } from 'express';

@Controller()
export class EnrollmentController 
{
  constructor(private commandBus: CommandBus) 
  {

  }

  @Post("enroll/:studentId/:universityId") 
  async enroll(@Param() params, @Res() response: Response) : Promise<void>
  {
    var command = new AddEnrollmentCommand();
    command.studentId = params.studentId;
    command.universityId = params.universityId;
    
    var result = await this.commandBus.execute(command);

    var errors = (<AddEnrollmentResponse>result).errors;
    var httpStatus = errors != undefined && errors.length > 0 
      ? HttpStatus.UNPROCESSABLE_ENTITY : HttpStatus.OK;

    response
      .status(httpStatus)
      .json(result);
  }
}