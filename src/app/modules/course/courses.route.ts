import express from 'express';
import { CourseControllers } from './course.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { CourseValidations } from './course.validation';

const router = express.Router();

router.get('/:courseId/reviews', CourseControllers.getCourseByIdWithReviews);

export const CoursesRoutes = router;