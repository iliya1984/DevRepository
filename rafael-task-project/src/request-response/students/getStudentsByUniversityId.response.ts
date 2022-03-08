import { StudentItemModel } from "./studentItem.model";

export class GetStudentsByUniversityIdResponse
{
    public students: Array<StudentItemModel>;

    constructor()
    {
        this.students = new Array<StudentItemModel>();
    }
}