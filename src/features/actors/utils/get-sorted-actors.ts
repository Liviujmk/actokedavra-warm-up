import { Actor, ActorSorting } from '../types/actors.interface';

// Function to get sorted actors list (ascending, descending)
export const getSortedActors = ({
  actors = [],
  order = 'Ascending',
}: {
  actors: Actor[] | undefined;
  order: ActorSorting;
}) => {
  const actorsList = [...actors];
  return order === 'Ascending'
    ? actorsList.sort((a, b) => a.id - b.id)
    : actorsList.sort((a, b) => b.id - a.id);
};
