/* eslint-disable @typescript-eslint/no-explicit-any */
import { Review } from '../review/review.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getCourseByIdWithReviewsFromDB = async (id: string) => {
  const result = await Course.findById(id);
  const result2 = await Review.find({ courseId: id });
  // console.log(result2,11)
  return { result, result2 };
};

const getTheBestCourseFromDB = async () => {
  const rResult = await Review.find();

  // for get max average rating course * form chat gpt*
  const courseIdTotalRating: { [courseId: string]: number } = {};
  const courseIdReviewCount: { [courseId: string]: number } = {};
  rResult.forEach((review: any) => {
    if (courseIdTotalRating[review.courseId]) {
      courseIdTotalRating[review.courseId] += review.rating;
      courseIdReviewCount[review.courseId]++;
    } else {
      courseIdTotalRating[review.courseId] = review.rating;
      courseIdReviewCount[review.courseId] = 1;
    }
  });
  let maxAverageRating = -1;
  let courseIdWithMaxAverage = '';
  for (const courseId in courseIdTotalRating) {
    const totalRating = courseIdTotalRating[courseId];
    const reviewCount = courseIdReviewCount[courseId];
    const averageRating = totalRating / reviewCount;
    if (averageRating > maxAverageRating) {
      maxAverageRating = averageRating;
      courseIdWithMaxAverage = courseId;
    }
  }
  const averageRating = maxAverageRating.toFixed(3);
  const reviewCount = courseIdTotalRating[courseIdWithMaxAverage];

  const cResult = await Course.findById(courseIdWithMaxAverage);
  return { cResult, rResult, averageRating, reviewCount };
};

export const CourseServices = {
  createCourseIntoDB,
  getCourseByIdWithReviewsFromDB,
  getTheBestCourseFromDB,
};
