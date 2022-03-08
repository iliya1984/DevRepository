import { IsNotEmpty } from "class-validator";
import { StudentCreationModel } from "./studentCreation.model";
import { StudentGradeModel } from "./studentGrade.model";

export class CreateStudentRequest
{
    @IsNotEmpty()
    public student : StudentCreationModel;
    
    public grades : Array<StudentGradeModel>;
}