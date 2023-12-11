import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewControllers } from './review.controller';
import { ReviewValidations } from './review.validation';

const router = express.Router();

// router.get('/', ReviewControllers.getAllCourses);

// router.get('/:id', CourseControllers.getSingleCourse);

router.post(
  '/',
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
