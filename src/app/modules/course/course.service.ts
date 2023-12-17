/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Review } from '../review/review.model';
import { courseExcludeFilteringFields } from './course.constant';
import { TCourse, TMeta } from './course.interface';
import { Course } from './course.model';
import { pagination } from './query';

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
  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  if (queryMaxPrice || queryMinPrice) {
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

    const queryResult = await Course.find(
      queryTags ? tagFilter : detailsLevelFilter,
    ).sort(sort);

    const { allPageData, totalPages } = pagination(queryResult, queryLimit);

    const meta: TMeta = {
      page: totalPages,
      limit: queryLimit,
      total: queryResult.length,
    };

    const result = allPageData[queryPage - 1];
    return { meta, result };
  }

  const queryResult = await Course.find(queryObj).sort(sort);

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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  // console.log(id, payload);
  const queryDataResult = await Course.findById(id);

  function createUpdateObject(original: any, update: any) {
    const updatedObject = { ...original };

    for (const key in update) {
      if (typeof update[key] === 'object' && !Array.isArray(update[key])) {
        updatedObject[key] = createUpdateObject(original[key], update[key]);
      } else {
        if (key === 'tags') {
          updatedObject[key] = mergeTags(original[key], update[key]);
        } else {
          updatedObject[key] = update[key];
        }
      }
    }

    return updatedObject;
  }

  function mergeTags(tags1: any, tags2: any) {
    const mergedTags = [];

    for (const tag1 of tags1) {
      const matchingTag2 = tags2.find((tag2: any) => tag1.name === tag2.name);
      if (matchingTag2) {
        mergedTags.push(matchingTag2);
      } else {
        mergedTags.push(tag1);
      }
    }
    for (const tag2 of tags2) {
      const matchingTag = mergedTags.find((tag) => tag.name === tag2.name);
      if (!matchingTag) {
        mergedTags.push(tag2);
      }
    }
    return mergedTags;
  }

  const thirdData = createUpdateObject(queryDataResult, payload);
  // console.log(thirdData._doc);

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  // const { preRequisiteCourses, ...courseRemainingData } = payload;
  // const { tags, ...courseRemainingData } = payload;
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
  //   if (tags && tags.length > 0) {
  //     // filter out the deleted fields
  //     const deletedPreRequisites = tags
  //       .filter((el: { name: any; isDeleted: any }) => el.name && el.isDeleted)
  //       .map((el: { name: any }) => el.name);
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
  //     const newPreRequisites = tags?.filter(
  //       (el: { name: any; isDeleted: any }) => el.name && !el.isDeleted,
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
  //   throw new AppError(httpStatus.BAD_REQUEST, 'catch Failed to update course');
  // }
  return updatedBasicCourseInfo;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseByIdWithReviewsFromDB,
  getTheBestCourseFromDB,
  updateCourseIntoDB,
  // deleteCourseFromDB,
};
