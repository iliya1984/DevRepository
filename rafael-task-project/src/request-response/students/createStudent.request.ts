import { StudentCreationModel } from "./studentCreation.model";
import { StudentGradeModel } from "./studentGrade.model";

export class CreateStudentRequest
{
    public student : StudentCreationModel;
    public grades : Array<StudentGradeModel>;
}