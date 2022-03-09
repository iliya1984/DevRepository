import { StudentGradeModel } from "./studentGrade.model";

export class StudentItemModel
{
    public id: string;
    public universityId: string;
    public name: string;
    public grades : Array<StudentGradeModel>;

    constructor()
    {
        this.grades = new Array<StudentGradeModel>();
    }
}