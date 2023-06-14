import { z } from 'zod';

export const ACTORS_BASE_URL = 'http://localhost:3000/';

export const ACTORS_VALIDATION_SCHEMA = z.object({
    name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    hobbies: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    description: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    occupation: z.string().min(2, { message: 'Name should have at least 2 letters' }),
});
