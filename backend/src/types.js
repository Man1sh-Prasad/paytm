import { z } from 'zod';

export const userSchema = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(8)
})

export const signinSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8)
})

export const updateSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().min(8).optional()
}).strict();
