import { Router } from 'express';
import { paymentController } from './payment.controller';

const router = Router();

router.post('/confirmation', paymentController.confirmationController);

router.get('/check/:email', paymentController.checkUser);

export const paymentRoutes = router;
