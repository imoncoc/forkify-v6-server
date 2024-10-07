import { initialPayment } from '../payments/payment.utils';
import Order from './order.model';
const createOrder = async (orderData: any) => {
  const { user } = orderData;

  let totalPrice = 20;

  const transactionId = `TXN-${Date.now()}`;

  const order = new Order({
    user,
    totalPrice: 20,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
  });

  await order.save();

  const paymentData = {
    transactionId,
    amount: totalPrice,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    customerAddress: user.address,
  };

  //payment
  const paymentSession = await initialPayment(paymentData);

  return paymentSession;
};

export const orderService = {
  createOrder,
};
