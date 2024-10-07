import { join } from 'path';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import orderModel from '../order/order.model';
import { User } from '../User/user.model';
import { orderRoutes } from '../order/order.routes';

// const confirmationService = async (transactionId: string, status: string) => {
//   const verifyResponse = await verifyPayment(transactionId);

//   let message = '';

//   if (verifyResponse && verifyResponse.pay_status === 'Successful') {
//     await orderModel.findOneAndUpdate(
//       { transactionId },
//       {
//         paymentStatus: 'paid',
//       },
//     );
//     message = 'Successful Paid';
//   } else {
//     message = 'Payment_Failed';
//   }

//   const filePath = join(__dirname, '../../../../public/confirmation.html');
//   let template = readFileSync(filePath, 'utf-8');

//   //   template = template.replace('{{message}}', message);
//   template = template.replace(/{{message}}/g, message);

//   return template;
// };

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    // Find the order by transactionId and update paymentStatus to 'paid'
    const order = await orderModel.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
      },
      { new: true }, // to get the updated order
    );

    if (order) {
      // Use the email from the user object in the order to update the user's premiumMembership
      await User.findOneAndUpdate(
        { email: order.user.email }, // Find the user by email
        { premiumMembership: true }, // Update premiumMembership to true
      );

      message = 'Successful Paid and Premium Membership Activated';
    } else {
      message = 'Order not found';
    }
  } else {
    message = 'Payment Failed';
  }

  const filePath = join(__dirname, '../../../../public/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace(/{{message}}/g, message);

  return template;
};

const getUserPaymentFromIntoDB = async (email: string) => {
  const result = await orderModel.find({ 'user.email': email });

  return result;
};

export const paymentServices = {
  confirmationService,
  getUserPaymentFromIntoDB,
};
