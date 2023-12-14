/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { TMeta } from '../modules/course/course.interface';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: TMeta;
  // {
  //   page: number;
  //   limit: number;
  //   total: number;
  //   // page:any;
  //   // limit:any;
  //   // total: any;
  // };
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // console.log(data)
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
