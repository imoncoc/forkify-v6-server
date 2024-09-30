import mongoose, { model, Schema } from 'mongoose';
import { TRecipe } from './recipe.interface';

const timeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Time name is required (e.g., Preparation, Cooking).'],
  },
  time: {
    type: Number,
    required: [true, 'Time in minutes is required.'],
    min: [1, 'Time must be at least 1 minute.'],
  },
});

const recipeSchema: Schema = new mongoose.Schema<TRecipe>(
  {
    title: {
      type: String,
      required: [true, 'Ingredient title is required.'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    ratting: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    upvote: {
      type: [String], // Array of user IDs or some identifier
      default: [],
    },
    downvote: {
      type: [String], // Array of user IDs or some identifier
      default: [],
    },
    comments: {
      type: [String], // Array of comment IDs or strings
      default: [],
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required.'],
    },
    timeFun: {
      type: [timeSchema],
      required: [true, 'Time information is required.'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail URL is required.'],
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const Recipe = model<TRecipe>('Recipe', recipeSchema);
