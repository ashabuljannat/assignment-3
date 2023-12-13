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
    required: true,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [tagsSchema],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
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
  durationInWeeks: Number,
  details: {
    type: detailsSchema,
    required: true,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
});

courseSchema.pre('save', async function (next) {
  const timeDifference =
    new Date(this.endDate).getTime() - new Date(this.startDate).getTime();
  const differenceInWeeks: number = Math.ceil(
    timeDifference / (7 * 24 * 60 * 60 * 1000),
  );
  this.durationInWeeks = differenceInWeeks;
  // this.review = "";
  next();
});

export const Course = model<TCourse>('Course', courseSchema);
