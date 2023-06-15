import {
  Paper,
  Center,
  Anchor,
  Container,
  Group,
  Button,
  createStyles,
  Select,
  Modal,
  Stack,
} from '@mantine/core';
import { IconChevronDown, IconSquareRoundedXFilled, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ActorSortingModes } from '../../features/actors/constants/actors.const';
import { useAppDispatch, useAppSelector } from '../store/store.hook';
import {
  clearStateAction,
  removeSelectedActorsAction,
  setActorsSortingAction,
  setDeleteAllAction,
  setSelectModeAction,
} from '../../features/actors/store/actors.slice';
import { ActorSorting } from '../../features/actors/types/actors.interface';
import { useDeleteActorMutation } from '../../features/actors/api/actors.api';

const useStyles = createStyles(() => ({
  btn: {
    border: 'none',
    paddingInline: '3rem',
  },
  item: {
    // applies styles to selected item
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: '#e0e0e0',
        color: '#000',
      },
    },

    // applies styles to hovered item
    '&[data-hovered]': {},
  },
}));

export const Header = () => {
  const dispatch = useAppDispatch();
  const { classes, cx } = useStyles();
  const { sorting } = useAppSelector((state) => state.actor);
  const { selectMode } = useAppSelector((state) => state.actor);
  const { selectedActors } = useAppSelector((state) => state.actor);
  const [deleteMutation] = useDeleteActorMutation();
  const [opened, { open, close }] = useDisclosure(false);

  // bulkDelete function is used to delete all selected actors
  function bulkDelete() {
    selectedActors?.forEach((id: number) => {
      deleteMutation(id);
    });
    notifications.show({
      title: 'Actors actions',
      message: 'Selected actor deleted successfully',
      color: 'red',
    });
    // reset state to initialState
    dispatch(clearStateAction());
  }
  return (
    <>
      <Paper shadow="xs">
        <Center h={80} mx="auto">
          <Anchor href="" fz="lg" fw={700}>
            ActoKedavra
          </Anchor>
        </Center>
      </Paper>
      <Paper mb="md" bg="#eff0f6">
        <Container size={1200}>
          <Group position="apart" py="1rem">
            {selectMode ? (
              <>
                <Button.Group>
                  <Button
                    variant="default"
                    leftIcon={
                      <IconSquareRoundedXFilled
                        size="1rem"
                        onClick={() => {
                          dispatch(setSelectModeAction(false));
                          dispatch(removeSelectedActorsAction());
                          dispatch(setDeleteAllAction(false));
                        }}
                      />
                    }
                  >
                    {selectedActors?.length} selected
                  </Button>
                  <Button variant="default" onClick={() => dispatch(setDeleteAllAction(true))}>
                    Select all
                  </Button>
                </Button.Group>
                <Button
                  disabled={!selectedActors || !selectedActors.length}
                  variant="filled"
                  color="red"
                  leftIcon={<IconTrash size="1rem" />}
                  onClick={open}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Select
                  value={sorting}
                  rightSection={<IconChevronDown size="1rem" />}
                  data={ActorSortingModes}
                  rightSectionWidth={30}
                  className={cx(classes.item)}
                  onChange={(e: ActorSorting) => dispatch(setActorsSortingAction(e))}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                />
                <Button
                  variant="default"
                  className={cx(classes.btn)}
                  onClick={() => dispatch(setSelectModeAction(true))}
                >
                  Select
                </Button>
              </>
            )}
          </Group>
        </Container>
        <Modal
          opened={opened}
          onClose={close}
          title="Delete selected actors?"
          centered
          padding={25}
        >
          <Stack mt="xl">
            <Button
              color="red"
              fz="sm"
              size="md"
              px="4.5rem"
              radius="md"
              onClick={() => {
                // dispatch(setBulkDeleteAction(true));
                bulkDelete();
                close();
              }}
            >
              Yes, delete all
            </Button>
            <Button variant="subtle" color="dark" onClick={close}>
              I changed my mind
            </Button>
          </Stack>
        </Modal>
      </Paper>
    </>
  );
};
