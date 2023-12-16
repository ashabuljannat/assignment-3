import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const { meta, result } = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course all are retrieved successfully',
    meta,
    data: result,
  });
});

const getCourseByIdWithReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { result, result2 } =
    await CourseServices.getCourseByIdWithReviewsFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: {
      course: result,
      reviews: result2,
    },
  });
});

const getTheBestCourse = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { cResult, rResult, averageRating, reviewCount } =
    await CourseServices.getTheBestCourseFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: {
      course: cResult,
      // reviews: rResult,
      averageRating,
      reviewCount,
    },
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});


export const CourseControllers = {
  createCourse,
  getCourseByIdWithReviews,
  getAllCourses,
  getTheBestCourse,
  updateCourse,
  // deleteCourse,
};
