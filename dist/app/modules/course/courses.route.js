"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.get('/', course_controller_1.CourseControllers.getAllCourses);
router.get('/:courseId/reviews', course_controller_1.CourseControllers.getCourseByIdWithReviews);
router.get('/:courseId', course_controller_1.CourseControllers.updateCourse);
router.patch('/:courseId', (0, validateRequest_1.default)(course_validation_1.CourseValidations.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse);
// router.put(
//   '/:courseId',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// );
exports.CoursesRoutes = router;
