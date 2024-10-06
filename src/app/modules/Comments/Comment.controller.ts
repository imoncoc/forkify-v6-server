import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { commentServices } from './Commnet.service';

const createNewComment = catchAsync(async (req, res) => {
  console.log('hit controller');
  const { recipeId } = req.params;
  console.log({ recipeId });

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
  const { userId } = req.params;
  const result = await commentServices.getAllCommentFromDB(userId);

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
