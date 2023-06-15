import { useEffect, useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdateActorMutation } from '../api/actors.api';
import { setActiveActorAction } from '../store/actors.slice';
import { useAppDispatch, useAppSelector } from '../../../common/store/store.hook';
import { ACTORS_VALIDATION_SCHEMA, initialValues } from '../constants/actors.const';
import { ActorForm } from './actor-form';

import { FormValues } from '../types/actors.interface';

export const ActorUpdate = () => {
  const dispatch = useAppDispatch();
  const [actorMutation, { isSuccess }] = useUpdateActorMutation();
  const [opened, setOpened] = useState<boolean>(false);

  // initialize form with useForm hook
  const form = useForm({
    validate: zodResolver(ACTORS_VALIDATION_SCHEMA),
    initialValues,
  });
  const { activeActor } = useAppSelector((state) => state.actor);

  // defaultClose function is used to reset form and close modal
  const defaultClose = () => {
    dispatch(setActiveActorAction(null));
  };

  // updateActor function is used to update actor
  function updateActor(values: FormValues) {
    actorMutation({ id: activeActor?.id, actor: { ...activeActor, ...values } });
    defaultClose();
  }

  // useEffect is used to show notification when actor is updated successfully
  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: 'Actor Action',
        message: 'Actor updated successfully',
      });
    }

    // set active actor to null when actor is updated successfully
    dispatch(setActiveActorAction(null));
  }, [isSuccess]);

  // useEffect is used to set form values when activeActor is changed in order to update actor
  useEffect(() => {
    setOpened(!!activeActor?.id);
    form.setValues({
      name: activeActor?.name || '',
      hobbies: activeActor?.hobbies || '',
      occupation: activeActor?.occupation || '',
      description: activeActor?.description || '',
    });
  }, [activeActor]);

  return (
    <ActorForm
      opened={opened}
      defaultClose={defaultClose}
      localOnSubmit={updateActor}
      actionTitle="Update actor"
      form={form}
    />
  );
};
