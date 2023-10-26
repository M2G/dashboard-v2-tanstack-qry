import { z } from 'zod';

export const INPUT_NAME = {
  EMAIL: 'email',
};

export const INITIAL_VALUES = {
  [INPUT_NAME.EMAIL]: '',
};

export const ERROR_TEXT_REQUIRED = {
  ERROR_TEXT_REQUIRED_EMAIL: 'Email requis',
};

export const LABEL_EMAIL = 'Email';

export const PLACEHOLDER_EMAIL = 'Email';

export const formSchema = z.object({
  email: z.string().email('Invalid email').min(1, ERROR_TEXT_REQUIRED.ERROR_TEXT_REQUIRED_EMAIL),
});
