import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './categories.controller';
import { CategoryValidations } from './categories.validation';

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories);

router.post(
  '/',
  validateRequest(CategoryValidations.categoryValidationSchema),
  CategoryControllers.createCategory,
);

// router.get('/:id', CourseControllers.getSingleCourse);

export const CategoriesRoutes = router;
