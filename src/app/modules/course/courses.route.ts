import express from 'express';
import { CourseControllers } from './course.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { CourseValidations } from './course.validation';

const router = express.Router();

router.get('/', CourseControllers.getAllCourses);

router.put('/:courseId', CourseControllers.updateCourse);

router.get('/:courseId/reviews', CourseControllers.getCourseByIdWithReviews);

// router.put(
//   '/:courseId',
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );

export const CoursesRoutes = router;
