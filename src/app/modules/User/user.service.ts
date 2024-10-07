/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

  // eslint-disable-next-line no-unused-vars
  // const { password, ...userWithoutPassword } = result.toObject();
  return result;
};

const followOrUnfollowIntoDB = async (userId: string, targetUserId: string) => {
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(targetUserId)
  ) {
    throw new Error('Invalid userId or targetUserId');
  }

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) {
    throw new Error('User not found');
  }

  const isFollowing = user?.following?.includes(targetUserId);

  if (isFollowing) {
    // Unfollow logic
    user.following = user?.following?.filter(
      (id) => id.toString() !== targetUserId,
    );
    targetUser.followers = targetUser?.followers?.filter(
      (id) => id.toString() !== userId,
    );
  } else {
    // Follow logic
    user?.following?.push(targetUserId);
    targetUser?.followers?.push(userId);
  }

  await user.save();
  await targetUser.save();

  return { following: !isFollowing };
};

const getAllUserFollowersFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const ingredientQuery = new QueryBuilder(
    User.find({ _id: id }).populate('following'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await ingredientQuery.modelQuery;
  const meta = await ingredientQuery.countTotal();
  return { result, meta };
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
  followOrUnfollowIntoDB,
  getAllUserFollowersFromDB,
};
