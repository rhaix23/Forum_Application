import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import dayjs from "dayjs";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { IComment } from "../types/comment.types";
import { RichTextContent } from "./RichTextContent";

interface IProps {
  comment: IComment;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const ViewCommentModal = ({ comment, opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_VIEW_MODAL, payload: false })
      }
      title="View Comment Information"
      size="lg"
      centered
    >
      <Text>ID: {comment._id}</Text>
      <Text>Created by: {comment.user.username}</Text>
      <Text>Post: {comment.post.title}</Text>
      <Text>
        Date Created: {dayjs(comment.createdAt).format("MMMM DD, YYYY")}
      </Text>
      <Text>
        Last Updated: {dayjs(comment.updatedAt).format("MMMM DD, YYYY")}
      </Text>
      <Divider my={16} />
      <RichTextContent>{comment.body}</RichTextContent>
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
