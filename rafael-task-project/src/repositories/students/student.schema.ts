
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface StudentDocument extends Document {
  name: string;
}

export const StudentSchema = new mongoose.Schema({
  name: String
}
, {
  collection: 'students'
});