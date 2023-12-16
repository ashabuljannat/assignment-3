import { pagination } from './query';
/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from 'http-status';
// import AppError from '../../errors/AppError';
import { Review } from '../review/review.model';
import { courseExcludeFilteringFields } from './course.constant';
import { TCourse, TMeta } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (reqQuery: any) => {
  const queryObj = { ...reqQuery };
  courseExcludeFilteringFields.forEach((el) => delete queryObj[el]);

  const queryPage = Number(reqQuery.page) || 1;
  const queryLimit = Number(reqQuery.limit) || 10;

  const { maxPrice: queryMaxPrice, minPrice: queryMinPrice } = reqQuery;

  const queryTags = reqQuery.tags;
  const queryLevel = reqQuery.level;

  const { sortBy, sortOrder } = reqQuery;
  if (queryMaxPrice || queryMinPrice) {
    const sort:any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const queryResult = await Course.find({
      $and: [
        { price: { $gte: queryMinPrice } },
        { price: { $lte: queryMaxPrice } },
      ],
    }).sort(sort);

    const { allPageData, totalPages } = pagination(queryResult, queryLimit);
    const meta: TMeta = {
      page: totalPages,
      limit: queryLimit,
      total: queryResult.length,
    };

    const result = allPageData[queryPage - 1];
    return { meta, result };
  }

  if (queryTags || queryLevel) {
    const tagFilter = { tags: { $elemMatch: { name: queryTags } } };
    const detailsLevelFilter = { 'details.level': queryLevel };
    // console.log(queryTags);
    const queryResult = await Course.find(
      queryTags ? tagFilter : detailsLevelFilter,
    );
    // const queryResult = await Course.find(detailsLevelFilter);
    const { allPageData, totalPages } = pagination(queryResult, queryLimit);
    const meta: TMeta = {
      page: totalPages,
      limit: queryLimit,
      total: queryResult.length,
    };

    const result = allPageData[queryPage - 1];
    return { meta, result };
  }

  const queryResult = await Course.find(queryObj);
  const { allPageData, totalPages } = pagination(queryResult, queryLimit);
  const meta: TMeta = {
    page: totalPages,
    limit: queryLimit,
    total: queryResult.length,
  };

  const result = allPageData[queryPage - 1];
  return { meta, result };
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

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  // const { preRequisiteCourses, ...courseRemainingData } = payload;
  // try {
  //   //step1: basic course info update
  //   const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
  //     id,
  //     courseRemainingData,
  //     { new: true, runValidators: true },
  //   );
  //   if (!updatedBasicCourseInfo) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  //   }
  //   // check if there is any pre requisite courses to update
  //   if (preRequisiteCourses && preRequisiteCourses.length > 0) {
  //     // filter out the deleted fields
  //     const deletedPreRequisites = preRequisiteCourses
  //       .filter(
  //         (el: { course: any; isDeleted: any }) => el.course && el.isDeleted,
  //       )
  //       .map((el: { course: any }) => el.course);
  //     const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
  //       id,
  //       {
  //         $pull: {
  //           preRequisiteCourses: { course: { $in: deletedPreRequisites } },
  //         },
  //       },
  //       {
  //         new: true,
  //         runValidators: true,
  //       },
  //     );
  //     if (!deletedPreRequisiteCourses) {
  //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  //     }
  //     // filter out the new course fields
  //     const newPreRequisites = preRequisiteCourses?.filter(
  //       (el: { course: any; isDeleted: any }) => el.course && !el.isDeleted,
  //     );
  //     const newPreRequisiteCourses = await Course.findByIdAndUpdate(
  //       id,
  //       {
  //         $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
  //       },
  //       { new: true, runValidators: true },
  //     );
  //     if (!newPreRequisiteCourses) {
  //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  //     }
  //     const result = await Course.findById(id).populate(
  //       'preRequisiteCourses.course',
  //     );
  //     return result;
  //   }
  // } catch (err) {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  // }
};

// const updateAcademicDepartmentIntoDB = async (
//   id: string,
//   payload: Partial<TAcademicDepartment>,
// ) => {
//   const result = await AcademicDepartment.findOneAndUpdate(
//     { _id: id },
//     payload,
//     {
//       new: true,
//     },
//   );
//   return result;
// };

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { price: 99999, endDate: '2023-06-30' },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseByIdWithReviewsFromDB,
  getTheBestCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
