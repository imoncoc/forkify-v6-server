import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { recipeServices } from './recipe.service';

const createRecipe = catchAsync(async (req, res) => {
  // const result = await recipeServices.createRecipeIntoDB({
  //   ...JSON.parse(req.body.data),
  //   thumbnail: req.file?.path,
  // });
  const result = await recipeServices.createRecipeIntoDB(req.body);

  //   const result = await recipeServices.createRecipeIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe added successfully',
    data: result,
  });
});

const getAllRecipe = catchAsync(async (req, res) => {
  const result = await recipeServices.getAllRecipeFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully',
    data: result,
  });
});
const getSingleRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await recipeServices.getSingleRecipeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully',
    data: result,
  });
});
const getUserRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await recipeServices.getUserRecipesFromDB(id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully',
    data: result,
  });
});

const updateRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await recipeServices.updateRecipeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe update successfully',
    data: result,
  });
});

const updateUpvoteRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await recipeServices.updateUpvoteRecipeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe voted successfully',
    data: result,
  });
});
const updateAnyUserRating = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await recipeServices.updateAnyUserRatingIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe rating update successful',
    data: result,
  });
});

export const recipeControllers = {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
  getUserRecipe,
  updateRecipe,
  updateUpvoteRecipe,
  updateAnyUserRating,
};
