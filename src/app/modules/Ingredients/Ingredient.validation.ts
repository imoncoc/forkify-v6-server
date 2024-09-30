import { z } from 'zod';

const CreateIngredientValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Ingredient name cannot be empty.' })
      .max(100, { message: 'Ingredient name must be under 100 characters.' }),

    isDeleted: z
      .boolean({
        message: 'isDeleted must be a boolean value (true or false).',
      })
      .optional(),

    category: z
      .string()
      .min(1, { message: 'Category cannot be empty.' })
      .max(50, { message: 'Category name must be under 50 characters.' }),
  }),
});

export const IngredientValidations = {
  CreateIngredientValidation,
};
