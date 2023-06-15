import { useMemo } from 'react';
import { Alert, Box, Button, Center, LoadingOverlay } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useGetActorsQuery } from '../api/actors.api';

import { ActorCard } from './actor-card';
import { Actor } from '../types/actors.interface';
import { Header } from '../../../common/layouts/header';
import { Footer } from '../../../common/layouts/footer';
import { CardLayout } from '../../../common/layouts/card-layout';
import { EmptyState } from '../../../common/layouts/empty-state';
import { ActorCreate } from './actor-create';
import { ActorUpdate } from './actor-update';
import { useAppSelector } from '../../../common/store/store.hook';
import { getSortedActors } from '../utils/get-sorted-actors';

export const ActorsList = () => {
  const { sorting } = useAppSelector((state) => state.actor);
  const { data, isLoading, isError } = useGetActorsQuery();
  const [opened, { open, close }] = useDisclosure(false);

  // useMemo is used to memoize the result of the function: getSortedActors
  // used to sort actors by id in ascending or descending order
  const actors = useMemo(() => getSortedActors({ actors: data, order: sorting }), [data, sorting]);
  return (
    <Box pos="relative" mih={200} bg="#F7F7FC">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      {isError && (
        <Alert title="Error" color="red">
          Failed to load actors
        </Alert>
      )}

      <Header />

      {!actors?.length ? (
        <EmptyState open={open} />
      ) : (
        <CardLayout>
          {actors?.map((actor: Actor) => (
            <div key={actor.id}>
              <ActorCard actor={actor} />
            </div>
          ))}
        </CardLayout>
      )}

      {actors?.length && (
        <Center mt="5rem">
          <Button
            color="primary-blue"
            fz="sm"
            size="md"
            px="4.5rem"
            radius="md"
            disabled={actors?.length === 7}
            onClick={open}
          >
            Add new actor
          </Button>
        </Center>
      )}
      <ActorCreate opened={opened} close={close} />
      <ActorUpdate />
      <Footer />
    </Box>
  );
};
