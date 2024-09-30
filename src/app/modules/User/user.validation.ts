import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(100, { message: 'Name cannot exceed 100 characters' }),

    email: z.string().email({ message: 'Invalid email address' }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password cannot exceed 100 characters' }),

    phone: z.string().nonempty('Invalid phone number format'),

    role: z.enum(['admin', 'user'], {
      message: "Role must be either 'admin' or 'user'",
    }),

    address: z
      .string()
      .min(1, { message: 'Address is required' })
      .max(200, { message: 'Address cannot exceed 200 characters' }),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
