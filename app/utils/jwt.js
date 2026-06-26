import jwt from 'jsonwebtoken';

const secretCode = process.env.JWT_SECRET_CODE;

export const createAccessToken = (data) => {
  const tokenExpiration = process.env.JWT_EXPIRES_IN;

  const token = jwt.sign(data, secretCode, { expiresIn: tokenExpiration });

  return token;
};

export const createRefreshToken = (data) => {
  const tokenExpiration = process.env.JWT_REFRESH_EXPIRES_IN;

  const token = jwt.sign(data, secretCode, { expiresIn: tokenExpiration });

  return token;
};

export const verifyToken = (token) => {
  const verify = jwt.verify(token, secretCode);
  return verify;
};
