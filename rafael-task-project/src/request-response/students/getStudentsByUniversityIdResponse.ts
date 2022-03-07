import { StudentItemModel } from "./studentItemModel";

export class GetStudentsByUniversityIdResponse
{
    public students: Array<StudentItemModel>;

    constructor()
    {
        this.students = new Array<StudentItemModel>();
    }
}