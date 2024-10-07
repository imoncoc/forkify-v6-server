import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { commentServices } from './Commnet.service';
import { verifyPrivateToken } from '../../utils/verifyToken';

const createNewComment = catchAsync(async (req, res) => {
  const { recipeId } = req.params;

  const result = await commentServices.createNewCommentIntoDB(
    recipeId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});

const getAllCommentRecipe = catchAsync(async (req, res) => {
  const token = req.headers.authorization || '';
  const { userId, recipeId } = req.params;

  const result = await commentServices.getAllCommentFromDB(recipeId, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment retrieved successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const result = await commentServices.deleteCommentFromDB(commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

export const CommentControllers = {
  createNewComment,
  getAllCommentRecipe,
  deleteFacility,
};
