import { Container, SimpleGrid } from '@mantine/core';

interface Props {
    children: React.ReactNode
}

export const CardLayout = ({ children }: Props) => (
    <Container size={1200}>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[{ maxWidth: '36rem', cols: 1, spacing: 'sm' }]}
        >{children}
        </SimpleGrid>
    </Container>
);
