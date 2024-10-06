import mongoose, { model, Schema } from 'mongoose';
import { TComment } from './Comment.interface';

const commentSchema: Schema = new mongoose.Schema<TComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required.'],
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'Recipe id is required.'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required.'],
    },
    isDeleted: {
      type: String,
      default: false,
    },
    commentCanDelete: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = model<TComment>('Comment', commentSchema);
