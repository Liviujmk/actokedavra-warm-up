import { useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateActorMutation } from '../api/actors.api';
import { ACTORS_VALIDATION_SCHEMA, initialValues } from '../constants/actors.const';
import { ActorForm } from './actor-form';
import { FormValues } from '../types/actors.interface';

interface Props {
  opened: boolean;
  close: () => void;
}

export const ActorCreate = ({ opened, close }: Props) => {
  const [actorMutation, { isSuccess }] = useCreateActorMutation();

  // initialize form with useForm hook
  const form = useForm({
    validate: zodResolver(ACTORS_VALIDATION_SCHEMA),
    initialValues,
  });

  // defaultClose function is used to reset form and close modal
  const defaultClose = () => {
    form.reset();
    close();
  };

  // createActor function is used to create new actor
  function createActor(values: FormValues) {
    actorMutation(values);
    defaultClose();
  }
  // useEffect is used to show notification when actor is created successfully
  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: 'Actor Action',
        message: 'Actor created successfully',
      });
    }
  }, [isSuccess]);

  return (
    <ActorForm
      opened={opened}
      defaultClose={defaultClose}
      localOnSubmit={createActor}
      actionTitle="Add new actor"
      form={form}
    />
  );
};
