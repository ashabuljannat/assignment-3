"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const zod_1 = require("zod");
const tagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean(),
});
const detailsValidationSchema = zod_1.z.object({
    level: zod_1.z.string(),
    description: zod_1.z.string(),
});
const tagsUpdValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean(),
});
const detailsUpdValidationSchema = zod_1.z.object({
    level: zod_1.z.string(),
    description: zod_1.z.string(),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        instructor: zod_1.z.string(),
        categoryId: zod_1.z.string(),
        price: zod_1.z.number(),
        tags: zod_1.z.array(tagsValidationSchema),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        language: zod_1.z.string(),
        provider: zod_1.z.string(),
        details: detailsValidationSchema,
        review: zod_1.z.any().optional(),
    }),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(tagsUpdValidationSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        details: detailsUpdValidationSchema.optional(),
        review: zod_1.z.any().optional(),
    }),
});
exports.CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
