import { Card, Text, Button, Center, Avatar } from '@mantine/core';

export const EmptyState = ({ open } : { open: () => void }) => (
    <Center mt="8.9rem">
        <Card shadow="sm" padding="xl" radius="md" withBorder maw={400}>
            <Center>
                <Avatar src="https://emoji.aranja.com/static/emoji-data/img-apple-160/1f644.png" alt="it's me" size="10em" />
            </Center>

            <Text size="xl" align="center" mt="md" fw={600}>
                There are no actors here. Consider adding one.
            </Text>

            <Button variant="filled" color="primary-blue" fullWidth mt="xl" radius="md" onClick={open}>
                Add new actor
            </Button>
        </Card>
    </Center>
);
