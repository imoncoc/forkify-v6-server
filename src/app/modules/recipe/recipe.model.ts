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
      required: [true, 'Recipe title is required.'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    upvote: {
      type: [String],
      default: [],
    },
    downvote: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: [String], // Or use ObjectId if referencing another model
      required: [true, 'Ingredients are required.'],
    },
    timeFun: {
      type: Number, // Make sure timeSchema is defined
      required: [true, 'Time information is required.'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail URL is required.'],
    },
    tags: {
      type: [String], // Updated to match the interface
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publish: {
      type: String,
      required: true,
      default: 'pending',
    },
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Recipe = model<TRecipe>('Recipe', recipeSchema);
