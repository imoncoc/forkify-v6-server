import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/signup',
  multerUpload.single('image'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body.data = JSON.parse(req.body.data);
  //   next();
  // },
  // validateRequest(userValidation.createUserValidationSchema),
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

export const UserRoutes = router;
