"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const review_model_1 = require("../review/review.model");
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const query_1 = require("./query");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCoursesFromDB = (reqQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, reqQuery);
    course_constant_1.courseExcludeFilteringFields.forEach((el) => delete queryObj[el]);
    const queryPage = Number(reqQuery.page) || 1;
    const queryLimit = Number(reqQuery.limit) || 10;
    const { maxPrice: queryMaxPrice, minPrice: queryMinPrice } = reqQuery;
    const queryTags = reqQuery.tags;
    const queryLevel = reqQuery.level;
    const { sortBy, sortOrder } = reqQuery;
    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    if (queryMaxPrice || queryMinPrice) {
        const queryResult = yield course_model_1.Course.find({
            $and: [
                { price: { $gte: queryMinPrice } },
                { price: { $lte: queryMaxPrice } },
            ],
        }).sort(sort);
        const { allPageData, totalPages } = (0, query_1.pagination)(queryResult, queryLimit);
        const meta = {
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
        const queryResult = yield course_model_1.Course.find(queryTags ? tagFilter : detailsLevelFilter).sort(sort);
        const { allPageData, totalPages } = (0, query_1.pagination)(queryResult, queryLimit);
        const meta = {
            page: totalPages,
            limit: queryLimit,
            total: queryResult.length,
        };
        const result = allPageData[queryPage - 1];
        return { meta, result };
    }
    const queryResult = yield course_model_1.Course.find(queryObj).sort(sort);
    const { allPageData, totalPages } = (0, query_1.pagination)(queryResult, queryLimit);
    const meta = {
        page: totalPages,
        limit: queryLimit,
        total: queryResult.length,
    };
    const result = allPageData[queryPage - 1];
    return { meta, result };
});
const getCourseByIdWithReviewsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id);
    const result2 = yield review_model_1.Review.find({ courseId: id });
    // console.log(result2,11)
    return { result, result2 };
});
const getTheBestCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const rResult = yield review_model_1.Review.find();
    // for get max average rating course * form chat gpt*
    const courseIdTotalRating = {};
    const courseIdReviewCount = {};
    rResult.forEach((review) => {
        if (courseIdTotalRating[review.courseId]) {
            courseIdTotalRating[review.courseId] += review.rating;
            courseIdReviewCount[review.courseId]++;
        }
        else {
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
    const cResult = yield course_model_1.Course.findById(courseIdWithMaxAverage);
    return { cResult, rResult, averageRating, reviewCount };
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
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
});
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
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { price: 99999, endDate: '2023-06-30' }, {
        new: true,
    });
    return result;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getCourseByIdWithReviewsFromDB,
    getTheBestCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
};
