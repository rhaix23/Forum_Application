import { Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { IComment } from "../types/comment.types";
import { RichTextEditor } from "./RichTextEditor";
import { updateComment } from "../features/comment/commentThunks";

interface IProps {
  comment: IComment;
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateCommentModal = ({ comment, opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.category);
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

    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
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
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button size="xs" onClick={handleSubmit}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
