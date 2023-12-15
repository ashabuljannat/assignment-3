"use strict";
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
/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from 'http-status';
// import AppError from '../../errors/AppError';
const review_model_1 = require("../review/review.model");
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCoursesFromDB = (reqQuery) => __awaiter(void 0, void 0, void 0, function* () {
    // const { page, limit, ...reqMainQuery } = reqQuery;
    const queryObj = Object.assign({}, reqQuery);
    course_constant_1.courseExcludeFilteringFields.forEach((el) => delete queryObj[el]);
    // console.log(page, limit);
    const queryPage = Number(reqQuery.page) || 1;
    const queryLimit = Number(reqQuery.limit) || 10;
    // const queryPage = page || 1;
    // const queryLimit = limit || 10;
    // console.log(queryPage, queryLimit);
    // console.log(reqQuery);
    // console.log(outputObject);
    // const queryResult = await Course.find(reqMainQuery);
    const queryResult = yield course_model_1.Course.find(queryObj);
    const totalPages = Math.ceil(queryResult.length / queryLimit);
    const allPageData = [];
    function getPageData(pageNumber) {
        const startIndex = (pageNumber - 1) * queryLimit;
        const endIndex = startIndex + queryLimit;
        return queryResult.slice(startIndex, endIndex);
    }
    for (let page = 1; page <= totalPages; page++) {
        const pageData = getPageData(page);
        allPageData.push(pageData);
    }
    const meta = {
        page: totalPages,
        limit: +queryLimit,
        total: queryResult.length,
    };
    // console.log(meta);
    // console.log(queryResult);
    // return queryResult;
    const result = allPageData[queryPage - 1];
    // console.log(page)
    return { meta, result };
    // const result = await Course.find();
    // return result;
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
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
