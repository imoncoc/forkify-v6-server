import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.router';
import { IngredientRoutes } from '../modules/Ingredients/Ingredient.router';
import { recipeRoutes } from '../modules/recipe/recipe.route';
import { commentRoutes } from '../modules/Comments/Comment.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/recipe',
    route: IngredientRoutes,
  },
  {
    path: '',
    route: recipeRoutes,
  },
  {
    path: '/recipes',
    route: commentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
