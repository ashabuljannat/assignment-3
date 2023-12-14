import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId/reviews', CourseControllers.getCourseByIdWithReviews);
router.get('/:courseId', CourseControllers.updateCourse);


router.patch(
  '/:courseId',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// router.put(
//   '/:courseId',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// );

export const CoursesRoutes = router;
