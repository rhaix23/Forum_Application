import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { Dispatch } from "react";
import { IModalActions } from "../reducers/modalReducer";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  text?: string;
  confirmationText?: string;
  confirmationColor?: string;
  handleClick: any;
}

export const ConfirmationModal = ({
  opened,
  setOpened,
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmationText = "Delete",
  confirmationColor = "red",
  handleClick,
}: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      centered
    >
      <Text>{text}</Text>
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button size="xs" color={confirmationColor} onClick={handleClick}>
          {confirmationText}
        </Button>
      </Group>
    </Modal>
  );
};
