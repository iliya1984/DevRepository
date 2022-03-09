import { StudentGrade } from "./studentGrade";

export class StudentGradeList extends Array<StudentGrade>
{
    public count() : number
    {
        return this.length;
    }

    public avarage() : number
    {
        if(this.length == 0)
        {
            return 0;
        }

        var sum : number = 0;
        this.forEach(g => 
        {
            var grade = g.grade;
            sum += grade;
        });

        var avarage = sum / this.count();

        return avarage;
    }
}