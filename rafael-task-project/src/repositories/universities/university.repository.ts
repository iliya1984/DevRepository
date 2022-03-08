import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { University } from "src/entities/universities/university";
import { IUniversityRepository } from "./university.repository.interface";
import { UniversityDocument } from "./university.schema";

export class UniversityRepository implements IUniversityRepository
{
    constructor(@InjectModel('UniversityDocument') private universityModel: Model<UniversityDocument>) {}
    
    async create(university: University): Promise<string> {
        
        const createdStudent = new this.universityModel(university);
        await createdStudent.save();

        return university.id;
    }

}