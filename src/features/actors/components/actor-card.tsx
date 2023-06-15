/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
  rem,
  Card,
  Text,
  Badge,
  Button,
  Group,
  ActionIcon,
  Flex,
  Spoiler,
  Image,
  createStyles,
  Chip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconThumbUp, IconEdit, IconTrash } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../../../common/store/store.hook';
import { Actor } from '../types/actors.interface';
import {
  setActiveActorAction,
  removeSelectedActorAction,
  setSelectedActorAction,
  setDeleteAllAction,
} from '../store/actors.slice';
import { useDeleteActorMutation } from '../api/actors.api';

interface Props {
  actor: Actor;
}

// useStyles is used to style the some components
// @ts-ignore
const useStyles = createStyles((theme) => ({
  check: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(10),
    background: '#fff',
    color: '#fff',
    zIndex: '10',
    cursor: 'pointer',
    borderRadius: '1rem',
    padding: '1px',
  },
}));

export const ActorCard = ({ actor }: Props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [deleteProjectMutation, { isSuccess }] = useDeleteActorMutation();
  const { selectMode } = useAppSelector((state) => state.actor);
  const { deleteAll } = useAppSelector((state) => state.actor);
  const [checked, setChecked] = useState(false);

  // useEffect is used to notify user when actor is deleted successfully
  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: 'Actor actions',
        message: `${actor.name} actor deleted successfully`,
        color: 'green',
      });
    }
  }, [isSuccess]);

  // useEffect is used to update the state of checked and selectedActors array when selectMode is changed
  useEffect(() => {
    // if selectMode is false, set checked to false
    if (!selectMode) setChecked(false);
    if (deleteAll) setChecked(true);

    // if checked is true, push actor id to selectedActors array else remove actor from selectedActors array
    checked
      ? dispatch(setSelectedActorAction(actor.id))
      : dispatch(removeSelectedActorAction(actor.id));
  }, [checked, selectMode, deleteAll]);

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Card.Section mb="xs">
        {selectMode && (
          <Chip
            className={classes.check}
            checked={checked}
            onClick={() => dispatch(setDeleteAllAction(false))}
            onChange={() => {
              setChecked((v: any) => !v);
              dispatch(setDeleteAllAction(false));
            }}
            style={{ color: '' }}
          >
            &nbsp;
          </Chip>
        )}
        <Image src={actor.image} height={230} alt="Norway" />
      </Card.Section>
      <Text fw={700}>{actor.name}</Text>
      <Group position="apart">
        <Text fw={400} fz="sm" color="gray">
          {actor.occupation}
        </Text>
        <Flex align="center">
          <Text color="yellow" fz="sm" fw={600}>
            {actor.likes}
          </Text>
          <ActionIcon color="yellow" variant="transparent">
            <IconThumbUp size="1rem" />
          </ActionIcon>
        </Flex>
      </Group>

      <Group spacing={9} mt={12}>
        {actor?.hobbies?.split(',').map((hobby) => (
          <Badge color="indigo" radius="sm" key={randomId()}>
            {hobby}
          </Badge>
        ))}
      </Group>

      <Spoiler
        mt={12}
        maxHeight={40}
        showLabel="Read more"
        hideLabel="Read less"
        fz=".85rem"
        c="dimmed"
      >
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
