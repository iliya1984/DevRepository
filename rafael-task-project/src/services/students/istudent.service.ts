import { GetStudentsByUniversityIdResponse } from "src/request-response/students/getStudentsByUniversityIdResponse";

export interface IStudentService
{
    getStudentsByUniversityId(universityId : string): Promise<GetStudentsByUniversityIdResponse>;
}