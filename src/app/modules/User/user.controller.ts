import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  // const result = await userServices.createUserIntoDB({
  //   ...JSON.parse(req.body.data),
  //   profilePhoto: req.file?.path,
  // });
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await userServices.updateUserIntoDB(userId, {
    ...JSON.parse(req.body.data),
    profilePhoto: req.file?.path,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
};
