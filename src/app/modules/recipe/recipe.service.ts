import QueryBuilder from '../../builder/QueryBuilder';
import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

const createRecipeIntoDB = async (recipe: TRecipe) => {
  // console.log('recipe: ', recipe);
  const result = await Recipe.create(recipe);
  return result;
};

const getAllRecipeFromDB = async (query: Record<string, unknown>) => {
  const ingredientQuery = new QueryBuilder(Recipe.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await ingredientQuery.modelQuery;
  const meta = await ingredientQuery.countTotal();
  return { result, meta };
};

const getSingleRecipeFromDB = async (id: string) => {
  const result = await Recipe.findById(id);
  return result;
};
const getUserRecipesFromDB = async (id: string) => {
  const result = await Recipe.find({ user: id });
  return result;
  // const ingredientQuery = new QueryBuilder(Recipe.find({ user: id }), query)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();
  // const result = await ingredientQuery.modelQuery;
  // const meta = await ingredientQuery.countTotal();
  // return { result, meta };
};

export const recipeServices = {
  createRecipeIntoDB,
  getAllRecipeFromDB,
  getSingleRecipeFromDB,
  getUserRecipesFromDB,
};
