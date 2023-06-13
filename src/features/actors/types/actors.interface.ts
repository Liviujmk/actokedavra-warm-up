export interface Actor {
    id?: number;
    image: string;
    name: string;
    occupation: string;
    hobbies: string[];
    description: string;
    likes: number;
}

export type ActorSorting = 'Ascending' | 'Descending' | 'Default';
