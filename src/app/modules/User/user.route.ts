import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/signup',
  // multerUpload.single('image'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body.data = JSON.parse(req.body.data);
  //   next();
  // },
  validateRequest(userValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.patch(
  `/user/:userId`,
  multerUpload.single('image'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body.data = JSON.parse(req.body.data);
  //   next();
  // },
  // validateRequest(userValidation.createUserValidationSchema),
  UserControllers.updateUser,
);

router.post(
  '/user/follow/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.followUser,
);

router.get(
  '/user/following/:id',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUserFollowers,
);

export const UserRoutes = router;
