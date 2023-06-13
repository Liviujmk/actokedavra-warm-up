import { Alert, Box, LoadingOverlay } from '@mantine/core';

// import { useAppSelector } from 'common/store/store.hook';
import { useGetActorsQuery } from '../api/actors.api';

import { ActorCard } from './actor-card';
import { Actor } from '../types/actors.interface';
import { Header } from '../../../common/layouts/header';
import { Footer } from '../../../common/layouts/footer';
import { CardLayout } from '../../../common/layouts/card-layout';
import { EmptyState } from '../../../common/layouts/empty-state';

export const ActorsList = () => {
    const { data: actors, isLoading, isError } = useGetActorsQuery();

    return (
        <Box pos="relative" mih={200} bg="#F7F7FC">
          <LoadingOverlay visible={isLoading} overlayBlur={2} />

          {isError && (
            <Alert title="Bummer!" color="red">
              Failed to load actors
            </Alert>
          )}

          <Header />

          {!actors?.length ? <EmptyState /> :
          <CardLayout>
              {actors?.map((actor: Actor) => (
                <div key={actor.id}>
                  <ActorCard actor={actor} />
                </div>
              ))}
          </CardLayout>}

          <Footer />
        </Box>
    );
};
