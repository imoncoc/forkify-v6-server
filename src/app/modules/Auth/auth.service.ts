import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  //   const isUserExists = await User.findOne({ email: payload?.email });
  const user = await User.isUsersExistsByCustomId(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Check is password is correct
  //   const isPasswordMatched = await bcrypt.compare(
  //     payload?.password,
  //     isUserExists?.password,
  //   );
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched.');
  }

  // Create token sent to the client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return { accessToken, user };
};

export const AuthServices = {
  loginUser,
};
