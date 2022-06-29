import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import morgan from './config/morgan';
import routes from './route/index';
import error from './middleware/error';
import ApiError from './utils/ApiError';
import config from './config/config';

const { errorHandler, errorConverter } = error;
const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// api routes
app.use('/api', routes);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


export default app;
