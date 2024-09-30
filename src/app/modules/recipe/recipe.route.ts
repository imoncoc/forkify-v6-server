import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { recipeControllers } from './recipe.controller';
import { multerUpload } from '../../config/multer.config';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/recipe',
  multerUpload.single('image'),
  //   validateRequest(IngredientValidations.CreateIngredientValidation),
  auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.createRecipe,
);

export const recipeRoutes = router;
