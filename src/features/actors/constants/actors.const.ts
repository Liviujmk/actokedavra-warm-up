import { z } from 'zod';
import { FormValues } from '../types/actors.interface';

// Base url for actors api (json-server)
export const ACTORS_BASE_URL = 'http://localhost:3000/';

// Actors validation schema (zod)
export const ACTORS_VALIDATION_SCHEMA = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  hobbies: z.string().min(2, { message: 'Enter at least one hobbie' }),
  description: z.string().min(2, { message: 'Description should have at least 3 letters' }),
  occupation: z.string().min(2, { message: 'Occupation should have at least 2 letters' }),
});

// Initial values for actor form (mantine)
export const initialValues: FormValues = {
  image: 'http://www.gstatic.com/tv/thumb/persons/673/673_v9_ba.jpg',
  name: '',
  occupation: '',
  hobbies: '',
  description: '',
  likes: 52,
};

// Sorting modes for actors (ascending, descending, default)
export const ActorSortingModes: string[] = ['Ascending', 'Descending', 'Default'];
