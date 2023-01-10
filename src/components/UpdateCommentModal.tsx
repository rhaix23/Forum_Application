import { Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { IComment } from "../types/comment.types";
import { RichTextEditor } from "./RichTextEditor";
import { updateComment } from "../features/comment/commentThunks";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";

interface IProps {
  comment: IComment;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const UpdateCommentModal = ({ comment, opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.comment);
  const [body, setBody] = useState(comment.body);

  const handleSubmit = () => {
    if (!body) return;

    dispatch(
      updateComment({
        commentId: comment._id,
        body,
        postId: comment.post._id,
      })
    );

    setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false });
  };

  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
      }
      title="Update Comment"
      size="lg"
      centered
    >
      <TextInput
        label="ID"
        size="xs"
        value={comment._id}
        readOnly
        disabled
        mb={8}
      />

      <Box>
        <Text size={12} weight={500}>
          Comment
        </Text>
        <RichTextEditor content={body} setContent={setBody} status={status} />
      </Box>
      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
          }
          disabled={status === "pending"}
        >
          Cancel
        </Button>
        <Button size="xs" onClick={handleSubmit} loading={status === "pending"}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
