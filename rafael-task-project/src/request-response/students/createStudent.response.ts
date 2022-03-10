import { PropertyValidationErrorModel } from "../validation/PropertyValidationErrorModel";

export class CreateStudentResponse
{
    public id : string;
    public errors: Array<PropertyValidationErrorModel>;

    constructor()
    {
        this.errors = new Array<PropertyValidationErrorModel>();
    }


}