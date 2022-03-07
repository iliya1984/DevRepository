
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface StudentDocument extends Document {
  firstName: string;
  lastName: string;
}

export const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
}
, {
  collection: 'students'
});