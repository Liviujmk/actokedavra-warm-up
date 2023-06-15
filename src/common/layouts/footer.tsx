import { Paper, Text, Container, Flex } from '@mantine/core';

export const Footer = () => (
  <Paper shadow="xs" mt="4.55rem">
    <Container size={1000}>
      <Flex gap="7rem" justify="space-between" align="center" direction="row" wrap="wrap" py="lg">
        <Text fz="lg" fw={600}>
          {new Date().toLocaleDateString('en-UK')}
        </Text>
        <Text fz="lg" fw={600}>
          ActoKedavra
        </Text>
      </Flex>
    </Container>
  </Paper>
);
