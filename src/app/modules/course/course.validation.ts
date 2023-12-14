import { z } from 'zod';

const tagsValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const tagsUpdValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsUpdValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagsValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailsValidationSchema,
    review: z.any().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(tagsUpdValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: detailsUpdValidationSchema.optional(),
    review: z.any().optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
