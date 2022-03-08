import { StudentGrade } from "./studentGrade";

export class Student
{
    public  id : string;
    public name: string;
    public grades : Array<StudentGrade>;

    constructor()
    {
        this.grades = new Array<StudentGrade>();
    }
}