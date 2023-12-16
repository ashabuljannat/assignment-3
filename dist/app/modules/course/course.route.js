"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(course_validation_1.CourseValidations.createCourseValidationSchema), course_controller_1.CourseControllers.createCourse);
router.get('/best', course_controller_1.CourseControllers.getTheBestCourse);
// router.delete('/:courseId', CourseControllers.deleteCourse);
exports.CourseRoutes = router;
