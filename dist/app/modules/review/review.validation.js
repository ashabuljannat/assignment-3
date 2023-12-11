"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string(),
        rating: zod_1.z.number(),
        review: zod_1.z.string(),
    }),
});
exports.ReviewValidations = { reviewValidationSchema };
