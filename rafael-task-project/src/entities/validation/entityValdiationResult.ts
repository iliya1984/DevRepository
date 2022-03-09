import { PropertyValidationError } from "./propertyValidationError";

export class EntityValidationResult
{
    public errors : Array<PropertyValidationError>;

    public isValid() : boolean
    {
        return this.errors == null || this.errors.length === 0;
    }

    constructor()
    {
        this.errors = new Array<PropertyValidationError>();
    }
}