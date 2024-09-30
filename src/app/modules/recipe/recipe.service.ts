import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

const createRecipeIntoDB = async (recipe: TRecipe) => {
  console.log('recipe: ', recipe);
  const result = await Recipe.create(recipe);
  return result;
};

export const recipeServices = {
  createRecipeIntoDB,
};
