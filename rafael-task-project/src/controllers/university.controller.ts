
import { Body, Controller, Dependencies, Get, HttpCode, HttpStatus, Inject, NotImplementedException, Param, Post, Res, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { GetUniversityByIdResponse } from 'src/request-response/universities/getUniveristyById.response';
import { CreateUniversityResponse } from 'src/request-response/universities/createUniversity.response';
import { CreateUniversityRequest } from 'src/request-response/universities/createUniversity.request';
import { CreateUniversityCommand } from 'src/handlers/universities/createUniversity/createUniversity.command';
import { GetUniversityByIdQuery } from 'src/handlers/universities/getById/getUniversityById.query';

@Controller("university")
export class UniversityController 
{
  constructor(private commandBus: CommandBus) 
  {

  }

  @Get(':universityId')
  async getUniversityById(@Param() params): Promise<GetUniversityByIdResponse> 
  {
    var query = new GetUniversityByIdQuery();
    query.universityId = params.universityId;

    return await this.commandBus.execute(query);
  }

  @Post()
  async create(@Body() request : CreateUniversityRequest, @Res() response: Response) : Promise<void> 
  {
    var command = new CreateUniversityCommand();
    command.university = request.university;
    
    var result = await this.commandBus.execute(command);

    var httpStatus = (<CreateUniversityResponse>result).errors.length > 0 
      ? HttpStatus.UNPROCESSABLE_ENTITY : HttpStatus.CREATED;

    response
      .status(httpStatus)
      .json(result);
  }
}

