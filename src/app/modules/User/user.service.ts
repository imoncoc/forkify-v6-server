/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);

  // eslint-disable-next-line no-unused-vars
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};

const updateUserIntoDB = async (userId: string, userData: TUser) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }

  const objectId = new mongoose.Types.ObjectId(userId);
  const result = await User.findByIdAndUpdate(objectId, userData);
  console.log('result service: ', result);

  // eslint-disable-next-line no-unused-vars
  // const { password, ...userWithoutPassword } = result.toObject();
  return result;
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
};
