import { StudentGrade } from "./studentGrade";
import { StudentGradeList } from "./studentGradeList";

export class Student
{
    public  id : string;
    public universityId: string;
    public name: string;
    public grades : StudentGradeList;

    constructor()
    {
        this.grades = new StudentGradeList();
    }
}