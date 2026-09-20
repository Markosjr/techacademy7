import { z } from 'zod';

const emailSchema = z
  .email('Informe um e-mail válido.')
  .transform((email) => email.trim().toLowerCase());

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve possuir pelo menos 2 caracteres.').max(100),
  email: emailSchema,
  password: z.string().min(8, 'A senha deve possuir pelo menos 8 caracteres.').max(128),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Informe a senha.').max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
