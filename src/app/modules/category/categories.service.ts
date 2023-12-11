/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { TCategory } from './categories.interface';
import { Category } from './categories.model';
import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../errors/AppError';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
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
  const result = await Category.find();
  return result;
};



export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB
};
