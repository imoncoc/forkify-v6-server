import { ObjectId } from 'mongoose';

export type TComment = {
  userId: ObjectId;
  recipeId: ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  commentCanDelete?: boolean;
};
