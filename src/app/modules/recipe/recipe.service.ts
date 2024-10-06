import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

const createRecipeIntoDB = async (recipe: TRecipe) => {
  const result = await Recipe.create(recipe);
  return result;
};

const getAllRecipeFromDB = async (query: Record<string, unknown>) => {
  const ingredientQuery = new QueryBuilder(
    Recipe.find().populate('user'),
    query,
  )
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
const getUserRecipesFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  // const result = await Recipe.find({ user: id });
  // return result;
  const ingredientQuery = new QueryBuilder(Recipe.find({ user: id }), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await ingredientQuery.modelQuery;
  const meta = await ingredientQuery.countTotal();
  return { result, meta };
};

const updateRecipeIntoDB = async (id: string, userData: TRecipe) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid id');
  }

  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Recipe.findByIdAndUpdate(objectId, userData);

  // eslint-disable-next-line no-unused-vars
  // const { password, ...userWithoutPassword } = result.toObject();
  return result;
};

const updateUpvoteRecipeIntoDB = async (
  id: string,
  userData: { userId: string; isUpvote: boolean },
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid id');
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  const { userId, isUpvote } = userData;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const alreadyUpvoted = recipe?.upvote?.includes(userId);
  const alreadyDownvoted = recipe?.downvote?.includes(userId);

  if (isUpvote) {
    if (alreadyUpvoted) {
      throw new Error('Already upvoted');
    }
    // Remove user from downvotes if they previously downvoted
    if (alreadyDownvoted) {
      recipe.downvote = recipe?.downvote?.filter((user) => user !== userId);
    }
    // Add user to upvotes
    recipe?.upvote?.push(userId);
  } else {
    if (alreadyDownvoted) {
      throw new Error('Already downvoted');
    }
    // Remove user from upvotes if they previously upvoted
    if (alreadyUpvoted) {
      recipe.upvote = recipe?.upvote?.filter((user) => user !== userId);
    }
    // Add user to downvotes
    recipe?.downvote?.push(userId);
  }

  const result = await recipe.save();
  return result;
};

const updateAnyUserRatingIntoDB = async (
  recipeId: string,
  userData: { userId: string; ratingValue: number },
) => {
  const { userId, ratingValue } = userData;

  try {
    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    // Initialize ratings if it doesn't exist
    if (!Array.isArray(recipe.ratings)) {
      recipe.ratings = [];
    }

    // Check if the user has already rated the recipe
    const existingRating = recipe.ratings.find(
      (r) => r.userId.toString() === userId.toString(),
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = ratingValue;
    } else {
      // Add a new rating
      recipe.ratings.push({
        userId,
        rating: ratingValue,
        createdAt: new Date(),
      });
    }

    // Recalculate the average rating
    const totalRatings = recipe.ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0,
    );
    recipe.rating = parseFloat(
      (totalRatings / recipe.ratings.length).toFixed(2),
    );

    // Save the updated recipe
    const updatedRecipe = await recipe.save();

    return updatedRecipe;
  } catch (error: any) {
    throw new Error('Error updating recipe rating: ' + error.message);
  }
};

export const recipeServices = {
  createRecipeIntoDB,
  getAllRecipeFromDB,
  getSingleRecipeFromDB,
  getUserRecipesFromDB,
  updateRecipeIntoDB,
  updateUpvoteRecipeIntoDB,
  updateAnyUserRatingIntoDB,
};
