import mongoose, { ObjectId } from 'mongoose';

type TTime = {
  name: string;
  time: number;
};

interface IRating {
  userId: string;
  rating: number;
  createdAt?: Date;
}

export type TRecipe = {
  title: string;
  isDeleted?: boolean;
  isPremium?: boolean;
  rating?: number;
  upvote?: string[];
  downvote?: string[];
  comments?: string[];
  ingredients: string[];
  timeFun: number;
  thumbnail: string;
  tags: string[];
  description: string;
  user: ObjectId;
  publish?: 'publish' | 'denied' | 'pending';
  ratings?: IRating[];
};
