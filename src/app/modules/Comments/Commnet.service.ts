import mongoose from 'mongoose';
import { Recipe } from '../recipe/recipe.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Comment } from './Comment.model';
import { TComment } from './comment.interface';

const createNewCommentIntoDB = async (recipeId: string, userData: TComment) => {
  const { userId, comment } = userData;
  const recipe = await Recipe.findById(recipeId);
  console.log('hit service');

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Create a new comment
  const commentData = new Comment({
    userId,
    recipeId,
    comment,
    createdAt: new Date(),
  });

  const result = await Comment.create(commentData);
  return result;
};

const getAllCommentFromDB = async (userId: string) => {
  //   const result = await Comment.find();

  //   return result;

  const comments = await Comment.find().lean(); // Using lean() to work with plain objects

  // Map through the comments and add the commentCanDelete property
  const commentsWithDeleteFlag = comments.map((comment) => ({
    ...comment,
    commentCanDelete: comment.userId.toString() === userId.toString(),
  }));

  return commentsWithDeleteFlag;
};

const deleteCommentFromDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Comment ID');
  }
  const objectId = new mongoose.Types.ObjectId(id);
  // Check if the document exists before updating
  const existingFacility = await Comment.findById(objectId);
  if (!existingFacility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Comment ID');
  }

  const deletedFaculty = await Comment.findOneAndUpdate(
    { _id: objectId },
    { isDeleted: true },
    { new: true },
  );
  return deletedFaculty;
};

export const commentServices = {
  createNewCommentIntoDB,
  getAllCommentFromDB,
  deleteCommentFromDB,
};
