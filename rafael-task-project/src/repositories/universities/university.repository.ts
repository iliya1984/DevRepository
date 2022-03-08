import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { doc } from "prettier";
import { University } from "src/entities/universities/university";
import { IUniversityRepository } from "./university.repository.interface";
import { UniversityDocument } from "./university.schema";

export class UniversityRepository implements IUniversityRepository
{
    constructor(@InjectModel('UniversityDocument') private universityModel: Model<UniversityDocument>) {}
    
    async getById(universityId: string): Promise<University> {
       
        var document = await this.universityModel.findOne<UniversityDocument>({ where: { id : universityId }}).exec();

        if(document == undefined || document == null)
        {
            return null;
        }

        return this.mapDocumentToUniversity(document);
    }
    
    async create(university: University): Promise<string> {
        
        const createdStudent = new this.universityModel(university);
        await createdStudent.save();

        return university.id;
    }

    private mapDocumentToUniversity(document : UniversityDocument) : University
    {
        var university = new University();
        university.id = document.id;
        university.name  = document.name;
        university.maxNumberOfStudents  = document.maxNumberOfStudents;
        university.minGPA = document.minGPA;

        return university;
    }

}