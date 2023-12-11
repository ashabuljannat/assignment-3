import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const tagsSchema = new Schema<TTags>({
  name: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
  },
  description: {
    type: String,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, 'categoryId is required'],
    ref: 'Course',
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [tagsSchema],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  details: {
    type: detailsSchema,
    required: true,
  },
});

export const Course = model<TCourse>('Course', courseSchema);
