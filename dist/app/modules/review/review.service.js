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
exports.ReviewServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../errors/AppError';
// import { CourseSearchableFields } from './course.constant';
const review_model_1 = require("./review.model");
const createReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(payload);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Review.findById(id).populate(
    //   'preRequisiteCourses.course',
    // );
    // return result;
});
exports.ReviewServices = {
    createReviewIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
};
