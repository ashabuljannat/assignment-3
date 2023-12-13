"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_route_1 = require("../modules/review/review.route");
const categories_route_1 = require("../modules/category/categories.route");
const course_route_1 = require("../modules/course/course.route");
const courses_route_1 = require("../modules/course/courses.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/course',
        route: course_route_1.CourseRoutes,
    },
    {
        path: '/courses',
        route: courses_route_1.CoursesRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/categories',
        route: categories_route_1.CategoriesRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
