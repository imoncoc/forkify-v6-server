/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
  premiumMembership?: boolean;
  followers?: string[];
  following?: string[];
}

export interface UserModel extends Model<TUser> {
  // instance methods checking if the user exists
  isUserExistsByEmail(id: string): Promise<TUser>;
  isUsersExistsByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  // isJwtIssuedBeforePasswordChanged(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number,
  // ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
