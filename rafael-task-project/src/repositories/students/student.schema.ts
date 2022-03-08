
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface StudentDocument extends Document {

  id : string;
  name: string;
  grades : Array<StudentGradeDocument>;
}

export interface StudentGradeDocument
{
  courseName: string;
  grade : number;
}

export const StudentSchema = new mongoose.Schema({
  id : String,
  name: String,
  grades: Array
}
, {
  collection: 'students'
});