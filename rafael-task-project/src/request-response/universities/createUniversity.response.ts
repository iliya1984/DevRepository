import { PropertyValidationErrorModel } from "../validation/PropertyValidationErrorModel";

export class CreateUniversityResponse
{
    public id: string;
    public errors: Array<PropertyValidationErrorModel>;

    constructor()
    {
        this.errors = new Array<PropertyValidationErrorModel>();
    }
}