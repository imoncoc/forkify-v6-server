import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.router';
import { IngredientRoutes } from '../modules/Ingredients/Ingredient.router';
import { recipeRoutes } from '../modules/recipe/recipe.route';
import { commentRoutes } from '../modules/Comments/Comment.router';
import { orderRoutes } from '../modules/order/order.routes';
import { paymentRoutes } from '../modules/payments/payment.route';

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
  {
    path: '/payment',
    route: orderRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
