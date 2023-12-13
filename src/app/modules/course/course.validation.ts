import { z } from 'zod';

const tagsValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsValidationSchema = z.object({
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
    startDate:z.string(),
    endDate:z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailsValidationSchema
  }),
});

export const CourseValidations = { createCourseValidationSchema };
