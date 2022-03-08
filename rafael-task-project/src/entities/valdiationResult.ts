import { ValidationError } from "class-validator";

export class ValidationResult
{
    public errors : Array<ValidationError>;

    public isValid() : boolean
    {
        return this.errors == null || this.errors.length === 0;
    }
}