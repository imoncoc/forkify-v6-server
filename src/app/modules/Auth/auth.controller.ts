import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserFromDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// const loginUser = catchAsync(async (req, res) => {
//   const result = await AuthServices.loginUser(req.body);

//   // sendResponse(res, {
//   //   statusCode: httpStatus.OK,
//   //   success: true,
//   //   message: 'User is logged in successfully',
//   //   data: result,
//   // });

//   res.status(httpStatus.OK).json({
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User Logged Successfully',
//     token: result?.accessToken,
//     data: {
//       _id: result?.user?._id,
//       name: result?.user?.name,
//       email: result?.user?.email,
//       role: result?.user?.role,
//       phone: result?.user?.phone,
//       address: result?.user?.address,
//     },
//   });
// });

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userEmail = req.body.email;
  const result = await AuthServices.forgetPassword(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
};
