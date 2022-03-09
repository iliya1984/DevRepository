import { Student } from "src/entities/students/student";
import { University } from "src/entities/universities/university";
import { ValidationResult } from "src/entities/validation/validationResult";

export class AddEnrollmentValdationResult
{
    public student: Student;
    public university : University;
    public validationResult : ValidationResult;
}