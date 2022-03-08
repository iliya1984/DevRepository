import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UniversityDocument extends Document {

  id : string;
  name: string;
  maxNumberOfStudents: number;
  minGPA: number;
}

export const UniversitySchema = new mongoose.Schema({
  id : String,
  name: String,
  maxNumberOfStudents: String,
  minGPA: String
}
, {
  collection: 'universities'
});