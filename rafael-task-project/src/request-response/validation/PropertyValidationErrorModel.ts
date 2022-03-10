export class PropertyValidationErrorModel
{
    public propertyName: string;
    public errorMessages : Array<string>;

    constructor()
    {
        this.errorMessages = new Array<string>();
    }
}