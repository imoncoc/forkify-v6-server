import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { recipeControllers } from './recipe.controller';
import { multerUpload } from '../../config/multer.config';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/recipe',
  // multerUpload.single('image'),
  // validateRequest(IngredientValidations.CreateIngredientValidation),
  auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.createRecipe,
);

router.get(
  '/recipe',
  //   auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.getAllRecipe,
);
router.get(
  '/recipe/:id',
  //   auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.getSingleRecipe,
);
router.get(
  '/user-recipe/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.getUserRecipe,
);
router.patch(
  '/user-recipe/:id',
  auth(USER_ROLE.user),
  recipeControllers.updateRecipe,
);

router.post(
  '/user-recipe/vote/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.updateUpvoteRecipe,
);
router.post(
  '/user-recipe/ratings/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  recipeControllers.updateAnyUserRating,
);

export const recipeRoutes = router;
