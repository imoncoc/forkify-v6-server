import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { recipeServices } from './recipe.service';

const createRecipe = catchAsync(async (req, res) => {
  console.log('req.body: ', req.body);

  const result = await recipeServices.createRecipeIntoDB({
    ...JSON.parse(req.body.data),
    thumbnail: req.file?.path,
  });

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

export const recipeControllers = {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
};
