/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);

  // eslint-disable-next-line no-unused-vars
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};

export const userServices = {
  createUserIntoDB,
};
