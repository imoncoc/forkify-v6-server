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

export const recipeControllers = {
  createRecipe,
};
