import { PropertyValidationErrorModel } from "./PropertyValidationErrorModel";

export class PropertyValidationErrorListModel extends Array<PropertyValidationErrorModel>
{
    public add(propertyName : string, errorMessage : string) : void
    {
        
        var error : PropertyValidationErrorModel = null;

        this.forEach(e => {

            if(e.propertyName == propertyName)
            {
                error = e;
            }
        });

        if(error == null)
        {
            error = new PropertyValidationErrorModel();
            error.propertyName = propertyName;
            this.push(error);
        }

        error.errorMessages.push(errorMessage);
    }
}