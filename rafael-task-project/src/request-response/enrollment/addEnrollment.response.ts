import { ValidationError } from "src/entities/validation/ValidationError";

export class AddEnrollmentResponse
{
    isEnrolled: boolean;
    errors: Array<ValidationError>;
}