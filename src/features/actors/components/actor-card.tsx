/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { Card, Text, Badge, Button, Group, ActionIcon, Flex, Spoiler, Image } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconThumbUp, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAppDispatch } from '../../../common/store/store.hook';
import { Actor } from '../types/actors.interface';
import { setActiveActorAction } from '../store/actors.slice';
import { useDeleteActorMutation } from '../api/actors.api';

interface Props {
    actor: Actor;
}

export const ActorCard = ({ actor }: Props) => {
    const dispatch = useAppDispatch();

    const [deleteProjectMutation, { isSuccess }] = useDeleteActorMutation();

    useEffect(() => {
        if (isSuccess) {
          notifications.show({
            title: 'Actors actions',
            message: `${actor.name} actor deleted successfully`,
            color: 'green',
          });
        }
    }, [isSuccess]);

    return (
        <Card shadow="md" padding="lg" radius="md" withBorder>
            <Card.Section mb="xs">
                <Image
                  src={actor.image}
                  height={230}
                  alt="Norway"
                />
            </Card.Section>
            <Text fw={700}>{actor.name}</Text>
            <Group position="apart">
                <Text fw={400} fz="sm" color="gray">{actor.occupation}</Text>
                <Flex align="center">
                    <Text color="yellow" fz="sm" fw={600}>{actor.likes}</Text>
                    <ActionIcon color="yellow" variant="transparent">
                        <IconThumbUp size="1rem" />
                    </ActionIcon>
                </Flex>
            </Group>

            <Group spacing={9} mt={12}>
                {actor.hobbies.split(',').map((hobby) => (
                    <Badge color="indigo" radius="sm">{hobby}</Badge>
                ))}
            </Group>

            <Spoiler mt={12} maxHeight={40} showLabel="Read more" hideLabel="Read less" fz=".85rem" c="dimmed">
                <Text fw={400} c="dimmed" fz=".85rem">
                    {actor.description}
                </Text>
            </Spoiler>

            <Group grow>
                <Button
                  fullWidth
                  leftIcon={<IconEdit size="1rem" />}
                  variant="outline"
                  color="indigo"
                  mt="md"
                  radius="md"
                  onClick={() => dispatch(setActiveActorAction(actor))}
                >
                    Edit
                </Button>
                <Button
                  fullWidth
                  leftIcon={<IconTrash size="1rem" />}
                  variant="filled"
                  color="red"
                  mt="md"
                  radius="md"
                  onClick={() => deleteProjectMutation(actor.id)}
                >
                    Delete
                </Button>
            </Group>
        </Card>
    );
};
