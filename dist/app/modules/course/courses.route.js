"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
// import validateRequest from '../../middlewares/validateRequest';
// import { CourseValidations } from './course.validation';
const router = express_1.default.Router();
router.get('/:courseId/reviews', course_controller_1.CourseControllers.getCourseByIdWithReviews);
exports.CoursesRoutes = router;
