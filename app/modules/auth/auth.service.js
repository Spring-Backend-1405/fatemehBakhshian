import prisma from '../../utils/prisma.js';
import generateOTP from '../../utils/generateOtp.js';
import { hashPassword } from '../../utils/hashPassword.js';
import { sendVerificationCode } from '../../utils/sendVerificationCode.js';
import AppError from './../../utils/appError.js';
import { createAccessToken, createRefreshToken } from './../../utils/jwt.js';

export const sendVerifyCodeService = async ({ email }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new AppError('User already exists', 409);
  }

  await prisma.verificationCode.deleteMany({
    where: {
      email,
    },
  });

  const otpCode = generateOTP();

  const otpCodeHashed = await hashPassword(otpCode);

  await prisma.verificationCode.create({
    data: {
      code_hash: otpCodeHashed,
      email,
      expires_at: new Date(Date.now() + 2 * 60 * 1000),
    },
  });

  await sendVerificationCode(email, otpCode);

  return;
};

export const registerService = async ({ password, code, full_name, phone_number }) => {
  const verificationCode = await prisma.verificationCode.findUnique({
    where: { email },
  });

  if (!verificationCode) {
    throw new AppError('Invalid verification code', 400);
  }

  const isMatch = await verifyPassword(password, verificationCode.code_hash);

  if (!isMatch) {
    throw new AppError('Invalid verification code', 400);
  }

  if (verificationCode.expires_at < new Date()) {
    throw new AppError('Verification code has expired', 400);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      full_name,
      phone_number,
      role: {
        create: {
          role: 'ADMIN',
        },
      },
    },
  });

  await prisma.verificationCode.delete({
    where: { email },
  });

  const accessToken = createAccessToken({ userId: user.id, role: user.role.role });
  const refreshToken = createRefreshToken({ userId: user.id, role: user.role.role });

  return { accessToken, refreshToken };
};
