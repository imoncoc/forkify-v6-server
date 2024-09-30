import express from 'express';
import { IngredientControllers } from './Ingredient.controller';
import validateRequest from '../../middlewares/validateRequest';
import { IngredientValidations } from './Ingredient.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/ingredient',
  validateRequest(IngredientValidations.CreateIngredientValidation),
  IngredientControllers.createIngredient,
);
router.get(
  '/ingredient',
  auth(USER_ROLE.admin, USER_ROLE.user),
  IngredientControllers.getIngredients,
);
router.delete(
  '/ingredient/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  IngredientControllers.deleteIngredientByUser,
);

export const IngredientRoutes = router;
