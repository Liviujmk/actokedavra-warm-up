import { useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateActorMutation } from '../api/actors.api';
import { ACTORS_VALIDATION_SCHEMA } from '../constants/actors.const';
import { ActorForm } from './actor-form';

interface FormValues {
    image: string;
    name: string;
    occupation: string;
    hobbies: any;
    description: string;
    likes: number;
}

const initialValues: FormValues = {
    image: 'http://www.gstatic.com/tv/thumb/persons/673/673_v9_ba.jpg',
    name: '',
    occupation: '',
    hobbies: '',
    description: '',
    likes: 52,
};

export const ActorCreate = ({ opened, close }: any) => {
    const [actorMutation, { isSuccess }] = useCreateActorMutation();

    const form = useForm({
        validate: zodResolver(ACTORS_VALIDATION_SCHEMA),
        initialValues,
    });

    const defaultClose = () => {
        form.reset();
        close();
    };

    function createActor(values: FormValues) {
        actorMutation(values);
        defaultClose();
    }

    useEffect(() => {
        if (isSuccess) {
          notifications.show({
            title: 'Actor Action',
            message: 'Actor created successfully',
          });
        }
      }, [isSuccess]);

    return (
        <ActorForm opened={opened} defaultClose={defaultClose} localOnSubmit={createActor} actionTitle="Add new actor" form={form} />
    );
};
