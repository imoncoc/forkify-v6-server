import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User is logged in successfully',
  //   data: result,
  // });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Logged Successfully',
    token: result?.accessToken,
    data: {
      _id: result?.user?._id,
      name: result?.user?.name,
      email: result?.user?.email,
      role: result?.user?.role,
      phone: result?.user?.phone,
      address: result?.user?.address,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
