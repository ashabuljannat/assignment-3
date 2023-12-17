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
  const { tags, ...courseRemainingData } = payload;
  try {
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    if (tags && tags.length > 0) {
      const tagsForDelete = tags
        .filter(
          (el: { name: string; isDeleted: boolean }) => el.name && el.isDeleted,
        )
        .map((el: { name: string }) => el.name);

      const deleteTag = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: tagsForDelete } },
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!deleteTag) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      const tagsForUpdate = tags.filter(
        (el: { name: string; isDeleted: boolean }) => el.name && !el.isDeleted,
      );

      const updateTag = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: tagsForUpdate } },
        },
        { new: true, runValidators: true },
      );

      if (!updateTag) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }
    const result = await Course.findById(id);
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'catch Failed to update course');
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseByIdWithReviewsFromDB,
  getTheBestCourseFromDB,
  updateCourseIntoDB,
  // deleteCourseFromDB,
};
