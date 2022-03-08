import { University } from "src/entities/universities/university";

export interface IUniversityRepository
{
    create(university : University) : Promise<string>;
    getById(universityId: string): Promise<University>;
}