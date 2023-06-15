import { Box, Button, Group, Modal, Stack, TextInput, Textarea } from '@mantine/core';

interface Props {
  opened: boolean;
  defaultClose: () => void;
  localOnSubmit: (formValues: any) => void;
  form: any;
  actionTitle: string;
}

export const ActorForm = ({ opened, defaultClose, localOnSubmit, form, actionTitle }: Props) => (
  <>
    <Modal opened={opened} onClose={defaultClose} title={actionTitle} centered>
      <form onSubmit={form.onSubmit(localOnSubmit)}>
        <Box maw={420} mx="auto">
          <Group grow mb="xl">
            <TextInput label="Name" placeholder="Actor name" {...form.getInputProps('name')} />
            <TextInput
              label="Occupation"
              placeholder="Actor occupations"
              {...form.getInputProps('occupation')}
            />
          </Group>
          <TextInput
            label="Hobbies"
            placeholder="Enter hobbies sepparated by a comma"
            {...form.getInputProps('hobbies')}
            mb="xl"
          />
          <Textarea
            placeholder="Write a description about this actor"
            label="Description"
            withAsterisk
            {...form.getInputProps('description')}
          />
          <Stack mt="xl">
            <Button type="submit" color="primary-blue" fz="sm" size="md" px="4.5rem" radius="md">
              {actionTitle}
            </Button>
            <Button variant="subtle" onClick={defaultClose}>
              I changed my mind
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  </>
);
