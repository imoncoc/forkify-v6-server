import { Request, Response } from 'express';
import { paymentServices } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
  );
  res.send(result);
};

const checkUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await paymentServices.getUserPaymentFromIntoDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User payment retrieved successful',
    data: result,
  });
});

export const paymentController = {
  confirmationController,
  checkUser,
};
