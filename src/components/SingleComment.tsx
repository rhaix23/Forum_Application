import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteComment,
  updateComment,
} from "../features/comment/commentThunks";
import { RootState, useAppDispatch } from "../store";
import { IComment } from "../types/comment.types";
import { RichTextContent } from "./RichTextContent";
import { RichTextEditor } from "./RichTextEditor";

interface IProps {
  comment: IComment;
}

export const SingleComment = ({ comment }: IProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [body, setBody] = useState(comment.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.comment);

  const handleDelete = () => {
    if (id) {
      dispatch(deleteComment({ commentId: comment._id, postId: id }));
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (id) {
      dispatch(updateComment({ commentId: comment._id, postId: id, body }));
      setIsEditing(false);
    }
  };

  return (
    <Paper
      key={comment._id}
      withBorder
      py={8}
      px={16}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Flex justify="space-between" align="center">
        <Text size={12} color="gray.6">
          {comment.user.username} <>&#183;</> 8 hours ago
        </Text>
        {comment.user._id === user?._id && (
          <Menu shadow="md">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="yellow"
                icon={<IconPencil size={18} />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={<IconTrash size={18} />}
                onClick={() => setIsDeleting(true)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Flex>

      {isEditing ? (
        <>
          <RichTextEditor content={body} setContent={setBody} status={status} />
          <Group position="right" mt={16}>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setIsEditing(false)}
              disabled={status === "pending"}
            >
              Cancel
            </Button>

            <Button
              type="button"
              size="xs"
              onClick={handleEdit}
              disabled={status === "pending"}
            >
              Update
            </Button>
          </Group>
        </>
      ) : (
        <RichTextContent>{comment.body}</RichTextContent>
      )}

      {isDeleting && (
        <Box mt={16}>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Are you sure?"
            color="red"
          >
            This action cannot be undone. Do you want to delete this comment?
          </Alert>
          <Group position="right" mt={16}>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setIsDeleting(false)}
              disabled={status === "pending"}
            >
              Cancel
            </Button>

            <Button
              type="button"
              size="xs"
              color="red"
              onClick={handleDelete}
              disabled={status === "pending"}
            >
              Delete
            </Button>
          </Group>
        </Box>
      )}
    </Paper>
  );
};
