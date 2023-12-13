import mongoose from 'mongoose';
import { TGenericErrorResponse, TErrorSources } from './errorInterface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID & cast error',
    errorSources,
  };
};

export default handleCastError;
