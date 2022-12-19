import { Button, Group, Modal, TextInput } from "@mantine/core";
import { Dispatch } from "react";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const CreateCategoryModal = ({ opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Category"
      centered
    >
      <TextInput
        placeholder="Enter the category name"
        label="Name"
        size="xs"
        withAsterisk
      />
      <Group position="right" mt={16}>
        <Button size="xs">Create</Button>
      </Group>
    </Modal>
  );
};
