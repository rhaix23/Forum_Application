import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { Dispatch } from "react";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  handleClick: any;
}

export const ConfirmationModal = ({
  opened,
  setOpened,
  title = "Are you sure?",
  handleClick,
}: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      centered
    >
      <Text>This action cannot be undone.</Text>
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button size="xs" color="red" onClick={handleClick}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};
