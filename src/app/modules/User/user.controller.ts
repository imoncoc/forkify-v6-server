import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  // const user = req.body;
  console.log(req.body);
  console.log(req.file);

  const result = await userServices.createUserIntoDB({
    ...JSON.parse(req.body.data),
    profilePhoto: req.file?.path,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
