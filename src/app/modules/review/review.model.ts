import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  rating: {
    type: Number,
    trim: true,
    required: true,
  },
  review: {
    type: String,
    trim: true,
    required: true,
  },
});

export const Review = model<TReview>('Review', reviewSchema);
