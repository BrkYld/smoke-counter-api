import express, { Router } from 'express';
import config from '../config/config';
import authRoute from './authRoute';
import userRoute from './userRoute';
const router = express.Router();

type Route = {
  path: string,
  route: Router,
}

const defaultRoutes : Route[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

// routes available only in development mode
const devRoutes : Route[] = [
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'dev') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
