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

export const CourseControllers = {
  createCourse,
  getCourseByIdWithReviews,
  getTheBestCourse,
};
