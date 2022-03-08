import { StudentCreationModel } from "src/request-response/students/studentCreation.model";
import { StudentGradeModel } from "src/request-response/students/studentGrade.model";

export class CreateStudentCommand
{
    public student : StudentCreationModel;
    public grades : Array<StudentGradeModel>;
}