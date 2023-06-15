// Interface for actors.
export interface Actor {
  id: number;
  image: string;
  name: string;
  occupation: string;
  hobbies: string;
  description: string;
  likes: number;
}

// Interface for actor form values (for useForm - mantine)
export interface FormValues {
  image: string;
  name: string;
  occupation: string;
  hobbies: any;
  description: string;
  likes: number;
}

// Type for sorting/ordering actors
export type ActorSorting = 'Ascending' | 'Descending' | 'Default';
