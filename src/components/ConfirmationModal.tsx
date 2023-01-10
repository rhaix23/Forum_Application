import { Button, Group, Modal, Text } from "@mantine/core";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";

interface IProps {
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
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
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false })
      }
      title={title}
      centered
    >
      <Text>{text}</Text>
      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false })
          }
        >
          Cancel
        </Button>
        <Button size="xs" color={confirmationColor} onClick={handleClick}>
          {confirmationText}
        </Button>
      </Group>
    </Modal>
  );
};
