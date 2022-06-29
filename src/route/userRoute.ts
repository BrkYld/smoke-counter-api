import express from 'express';
import userController from '../controller/user';
import { validate } from 'express-validation';
import { userValidation } from '../validation';
import { verifyToken } from '../middleware/auth';
const router = express.Router();

router
    .route('/smoke')
    .put(verifyToken, validate(userValidation.smoke), userController.smoke)
    .get(verifyToken, userController.smokingReport)

router
    .route('/daily')
    .get(verifyToken, userController.dailyReport)

router
    .route('/')
    .get(verifyToken, userController.getUser)


export default router;
