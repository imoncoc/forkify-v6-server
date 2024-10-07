import mongoose, { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
import { boolean } from 'joi';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email type',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: { type: String, required: true },
    profilePhoto: {
      type: String,
      default: null,
    },
    passwordChangedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    premiumMembership: {
      type: Boolean,
      default: false,
    },
    followers: {
      ref: 'User',
      type: [String],
      default: [],
    },
    following: {
      ref: 'User',
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    virtuals: true,
  },
);

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // current document
  // hashing password and save into DB
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// set empty "" after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isUsersExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
