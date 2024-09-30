import mongoose, { model, Schema } from 'mongoose';
import { TIngredient } from './Ingredient.interface';

const ingredientSchema: Schema = new mongoose.Schema<TIngredient>({
  name: {
    type: String,
    required: [true, 'Ingredient name is required.'],
    // trim: true,
    // maxlength: [100, 'Ingredient name must be under 100 characters.'],
  },
  isDeleted: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
    // trim: true,
    // maxlength: [50, 'Category name must be under 50 characters.'],
  },
});

export const Ingredient = model<TIngredient>('Ingredient', ingredientSchema);
