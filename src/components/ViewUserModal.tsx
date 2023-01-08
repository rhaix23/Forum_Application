import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import dayjs from "dayjs";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { IUser } from "../types/user.types";
import { RichTextContent } from "./RichTextContent";

interface IProps {
  user: IUser;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const ViewUserModal = ({ user, opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_VIEW_MODAL, payload: false })
      }
      title="View User Information"
      size="lg"
      centered
    >
      <Text>ID: {user._id}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Role: {user.role}</Text>
      <Text>Name: {user.name}</Text>
      <Text>Position: {user.position}</Text>
      <Text>WorkingAt: {user.workingAt}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Github: https://github.com/{user.github}</Text>
      <Text>LinkedIn: https://www.linkedin.com/in/{user.linkedin}</Text>
      <Text>Date Joined: {dayjs(user.createdAt).format("MMMM DD, YYYY")}</Text>
      <Text>Account is disabled: {String(user.isDisabled)}</Text>
      {user.about && (
        <>
          <Divider my={16} />
          <Text sx={{ textDecoration: "underline" }}>About</Text>
          <RichTextContent>{user.about}</RichTextContent>
        </>
      )}
      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_VIEW_MODAL, payload: false })
          }
        >
          Close
        </Button>
      </Group>
    </Modal>
  );
};
