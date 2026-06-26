import catchError from '../../utils/catchError.js';
import { sendVerifyCodeService } from './auth.service.js';

export const sendVerifyCode = catchError(async (req, res, next) => {
  await sendVerifyCodeService(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Verification code sent successfully.',
  });
});

export const register = catchError(async (req, res, next) => {
  const response = await registerService(req.body);

  res.status(200).json({
    status: 'success',
    response,
  });
});
