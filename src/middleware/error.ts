import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../config/logger';
import ApiError from '../utils/ApiError';
import { Request, Response, NextFunction} from 'express';

const errorConverter = (err : ApiError | any , req: Request, res : Response, next: NextFunction ) : void => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err: any, req: Request, res : Response, next: NextFunction) : void => {
  let { statusCode, message } = err;
  if (config.env === 'prod' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'dev' && { stack: err.stack }),
  };

  if (config.env === 'dev') {
    logger.error(err);
  }
  
  res.status(statusCode).send(response);
};

export default {
  errorConverter,
  errorHandler,
};
