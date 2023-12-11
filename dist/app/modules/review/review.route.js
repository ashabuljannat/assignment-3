"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
// router.get('/', ReviewControllers.getAllCourses);
// router.get('/:id', CourseControllers.getSingleCourse);
router.post('/', (0, validateRequest_1.default)(review_validation_1.ReviewValidations.reviewValidationSchema), review_controller_1.ReviewControllers.createReview);
exports.ReviewRoutes = router;
