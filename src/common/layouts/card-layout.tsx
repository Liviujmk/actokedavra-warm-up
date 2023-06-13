import { Button, Center, Container, SimpleGrid } from '@mantine/core';
import { useGetActorsQuery } from '../../features/actors/api/actors.api';

interface Props {
    children: React.ReactNode
}

export const CardLayout = ({ children }: Props) => {
    const { data: actors } = useGetActorsQuery();
    return (
        <Container size={1200}>
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[{ maxWidth: '36rem', cols: 1, spacing: 'sm' }]}
            >
            {children}
            </SimpleGrid>
            { actors?.length && (
            <Center mt="5rem">
                <Button color="primary-blue" fz="sm" size="md" px="4.5rem" radius="md" disabled={actors?.length === 7}>Add new actor</Button>
            </Center>
            )}
        </Container>
    );
};
