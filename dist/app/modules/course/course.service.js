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
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
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
exports.CourseServices = {
    createCourseIntoDB,
    getCourseByIdWithReviewsFromDB,
    getTheBestCourseFromDB,
};
