import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { userAuther } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/newUser', newUserValidator, userController.userRegistration)

router.post('/login', userController.Login)
export default router;