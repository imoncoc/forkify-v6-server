import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { CommentControllers } from './Comment.controller';

const router = express.Router();

router.post(
  '/comment/:recipeId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CommentControllers.createNewComment,
);
router.get(
  '/comments/:recipeId',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  CommentControllers.getAllCommentRecipe,
);

router.delete(
  '/comments/:commentId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CommentControllers.deleteFacility,
);

export const commentRoutes = router;
