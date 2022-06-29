import mongoose from 'mongoose';
import config from './config/config';
import app from './app';
import logger from './config/logger';
import http from 'http';


let server: http.Server;

mongoose.connect(config.mongoDB.url, config.mongoDB.options).then(() => {
  logger.info('CONNECTED to DB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
