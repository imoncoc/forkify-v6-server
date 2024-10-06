import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { TIngredient } from './Ingredient.interface';
import { Ingredient } from './Ingredient.model';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createIngredientIntoDB = async (ingredient: TIngredient) => {
  const result = await Ingredient.create(ingredient);
  return result;
};

const getAllIngredientsFromDB = async (query: Record<string, unknown>) => {
  // const result = await Booking.find().populate('facility');
  const ingredientQuery = new QueryBuilder(Ingredient.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await ingredientQuery.modelQuery;
  const meta = await ingredientQuery.countTotal();
  return { result, meta };
};

const deleteIngredientByUserFromDB = async (id: string, user: JwtPayload) => {
  const { userEmail } = user;
  const userData = await User.isUsersExistsByCustomId(userEmail);
  const isIngredientExists = await Ingredient.findById(id);
  if (!isIngredientExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This ingredient is not found`);
  }
  if (isIngredientExists.isDeleted === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This ingredient is already deleted',
    );
  }

  const updatedIngredient = await Ingredient.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!updatedIngredient) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update the booking',
    );
  }

  return updatedIngredient;
};

export const ingredientServices = {
  createIngredientIntoDB,
  getAllIngredientsFromDB,
  deleteIngredientByUserFromDB,
};
