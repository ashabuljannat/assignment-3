import express from 'express';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.get('/:courseId/reviews', CourseControllers.getCourseByIdWithReviews);

export const CoursesRoutes = router; 