import { useEffect, useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useUpdateActorMutation } from '../api/actors.api';
import { setActiveActorAction } from '../store/actors.slice';
import { useAppDispatch, useAppSelector } from '../../../common/store/store.hook';
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

export const ActorUpdate = () => {
    const dispatch = useAppDispatch();
    const [actorMutation, { isSuccess }] = useUpdateActorMutation();
    const [opened, setOpened] = useState<boolean>(false);

    const form = useForm({
        validate: zodResolver(ACTORS_VALIDATION_SCHEMA),
        initialValues,
    });
    const { activeActor } = useAppSelector((state) => state.actor);

    const defaultClose = () => {
        dispatch(setActiveActorAction(null));
    };

    function updateActor(values: FormValues) {
        actorMutation({ id: activeActor?.id, actor: { ...activeActor, ...values } });
        defaultClose();
    }

    useEffect(() => {
        if (isSuccess) {
          notifications.show({
            title: 'Actor Action',
            message: 'Actor updated successfully',
          });
        }

        dispatch(setActiveActorAction(null));
    }, [isSuccess]);

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
        <ActorForm opened={opened} defaultClose={defaultClose} localOnSubmit={updateActor} actionTitle="Update actor" form={form} />
    );
};
