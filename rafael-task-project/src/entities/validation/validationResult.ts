import { ValidationError } from "./ValidationError";

export class ValidationResult
{
    public errors : Array<ValidationError>;

    public isValid() : boolean
    {
        return this.errors == null || this.errors.length === 0;
    }

    constructor()
    {
        this.errors = new Array<ValidationError>();
    }
}