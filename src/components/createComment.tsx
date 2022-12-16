import { Box, Button, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createComment } from "../features/comment/commentThunks";
import { RootState, useAppDispatch } from "../store";
import { RichTextEditor } from "./RichTextEditor";
import { toast } from "react-toastify";

export const CreateComment = () => {
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const { post } = useSelector((state: RootState) => state.post);
  const { status } = useSelector((state: RootState) => state.comment);

  const handleCreateComment = () => {
    if (post && newComment) {
      dispatch(createComment({ body: newComment, postId: post._id }));
      setNewComment("");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Text size={12} color="gray.6">
        Comment as {user.username}
      </Text>
      <RichTextEditor
        content={newComment}
        setContent={setNewComment}
        status={status}
      />
      <Group position="right" mt={16}>
        <Button
          type="button"
          size="xs"
          disabled={status === "pending"}
          onClick={handleCreateComment}
        >
          Comment
        </Button>
      </Group>
    </Box>
  );
};
