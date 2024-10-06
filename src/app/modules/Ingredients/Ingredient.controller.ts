import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ingredientServices } from './Ingredient.service';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const createIngredient = catchAsync(async (req, res) => {
  const result = await ingredientServices.createIngredientIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ingredient added successfully',
    data: result,
  });
});

const getIngredients = catchAsync(async (req, res) => {
  const result = await ingredientServices.getAllIngredientsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ingredient retrieved successfully',
    data: result,
  });
});

const deleteIngredientByUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: JwtPayload = req.user;
    const result = await ingredientServices.deleteIngredientByUserFromDB(
      id,
      user,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ingredient deleted successfully',
      data: result,
    });
  },
);

export const IngredientControllers = {
  createIngredient,
  getIngredients,
  deleteIngredientByUser,
};
