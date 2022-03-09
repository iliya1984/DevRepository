import { HttpException, HttpStatus } from "@nestjs/common";

export class ArgumentInfo
{
    public name : string;
    public isEmpty : boolean;

    constructor()
    {
        this.isEmpty = false;
    }
}

export class InvalidArgumentException extends HttpException
{
    constructor(private errorMessage : string, private argument : ArgumentInfo)
    {
        super(InvalidArgumentException.buildErrorMessage(errorMessage, argument) , HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private static buildErrorMessage(errorMessage : string, argument : ArgumentInfo) : string
    {
        if(argument.isEmpty)
        {
            return errorMessage + " - Argument with name '" + argument.name + "' is NULL or EMPTY";
        }

        return errorMessage + " - Invalid argument with name '" + argument.name + "'";
    }
}