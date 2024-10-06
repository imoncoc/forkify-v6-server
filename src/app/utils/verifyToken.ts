import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyPrivateToken = (token: string) => {
  const tokenSplit = token.split(' ');

  if (tokenSplit.length !== 2 || tokenSplit[0] !== 'Bearer') {
    throw new Error('Please Provide Valid Token Format');
  }

  const accessToken = tokenSplit[1];

  const decoded = jwt.verify(
    accessToken,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  return userId;
};
