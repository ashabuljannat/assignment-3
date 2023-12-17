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
exports.CategoryServices = void 0;
const categories_model_1 = require("./categories.model");
// import AppError from '../../errors/AppError';
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categories_model_1.Category.create(payload);
    return result;
});
const getAllCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const courseQuery = new QueryBuilder(
    //   Category.find().populate('preRequisiteCourses.course'),
    //   query,
    // )
    //   .search(CourseSearchableFields)
    //   .filter()
    //   .sort()
    //   .paginate()
    //   .fields();
    // const result = await courseQuery.modelQuery;
    const result = yield categories_model_1.Category.find();
    return result;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoryFromDB,
};
