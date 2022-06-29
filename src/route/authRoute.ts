import express from 'express';
import userController from '../controller/user';
import { validate } from 'express-validation';
import { userValidation } from '../validation';
const router = express.Router();

router
    .route('/register')
    .post(validate(userValidation.createNew), userController.createUser)

router
    .route('/login')
    .post(validate(userValidation.createNew), userController.login)


export default router;
