export class PropertyValidationErrorModel
{
    public propertyName: string;
    public errors : Array<string>;

    constructor()
    {
        this.errors = new Array<string>();
    }
}