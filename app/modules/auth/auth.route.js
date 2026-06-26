import express from 'express';
import { register, sendVerifyCode } from './auth.controller.js';
import {
  checkValidation,
  registerValidation,
  sendVerifyCodeValidation,
} from './auth.validation.js';
const authRouter = express.Router();

authRouter.post('/send-code', sendVerifyCodeValidation, checkValidation, sendVerifyCode);
authRouter.post('/register', registerValidation, checkValidation, register);

export default authRouter;
