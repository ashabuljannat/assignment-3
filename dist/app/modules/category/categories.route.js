"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const categories_controller_1 = require("./categories.controller");
const categories_validation_1 = require("./categories.validation");
const router = express_1.default.Router();
router.get('/', categories_controller_1.CategoryControllers.getAllCategories);
router.post('/', (0, validateRequest_1.default)(categories_validation_1.CategoryValidations.categoryValidationSchema), categories_controller_1.CategoryControllers.createCategory);
// router.get('/:id', CourseControllers.getSingleCourse);
exports.CategoriesRoutes = router;
