/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../errors/AppError';
// import { CourseSearchableFields } from './course.constant';
import { Review } from './review.model';
import { TReview } from './review.interface';


const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  // const courseQuery = new QueryBuilder(
  //   Review.find().populate('preRequisiteCourses.course'), 
  //   query,
  // )
  //   .search(CourseSearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields(); 

  // const result = await courseQuery.modelQuery;
  // return result;
};

const getSingleCourseFromDB = async (id: string) => {
  // const result = await Review.findById(id).populate(
  //   'preRequisiteCourses.course',
  // );
  // return result;
};


export const ReviewServices = {
  createReviewIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB
};
