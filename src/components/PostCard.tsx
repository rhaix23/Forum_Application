import {
  ActionIcon,
  Alert,
  Box,
  Button,
  createStyles,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowUp, IconArrowDown, IconAlertCircle } from "@tabler/icons";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RichTextContent, RichTextEditor } from ".";
import {
  deletePost,
  deletePostRate,
  editPost,
  ratePost,
  updatePostRate,
} from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";
import { IPost } from "../types/post.types";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.blue[7],
    ":hover": {
      textDecoration: "underline",
    },
  },
}));

interface IProps {
  post: IPost;
}

const PostCard = ({ post }: IProps) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { status, error } = useSelector((state: RootState) => state.post);

  const userLiked = useMemo(() => {
    if (user) {
      return post.likes.find((like) => like.user === user._id);
    }
  }, [post, user]);

  const userDisliked = useMemo(() => {
    if (user) {
      return post.dislikes.find((dislike) => dislike.user === user._id);
    }
  }, [post, user]);

  const handleEdit = () => {
    if (id) {
      dispatch(editPost({ id, title, body }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deletePost({ id }));
      setIsDeleting(false);
      navigate(`/${post.subcategory}`);
    }
  };

  const handleRate = (value: -1 | 1) => {
    if (!user) {
      toast.error("You must be logged in to rate posts");
      return;
    }

    if (userLiked) {
      if (value === 1) {
        dispatch(deletePostRate({ id: userLiked._id, postId: post._id }));
      } else {
        dispatch(
          updatePostRate({ id: userLiked._id, value, postId: post._id })
        );
      }
    } else if (userDisliked) {
      if (value === 1) {
        dispatch(
          updatePostRate({ id: userDisliked._id, value, postId: post._id })
        );
      } else {
        dispatch(deletePostRate({ id: userDisliked._id, postId: post._id }));
      }
    } else {
      dispatch(ratePost({ value, postId: post._id }));
    }
  };

  let content: JSX.Element;
  if (isEditing) {
    content = (
      <Box sx={{ flex: 1 }}>
        <Box mb={16}>
          <TextInput
            mb={8}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Enter post title"
            required
          />
          <RichTextEditor
            content={post.body}
            setContent={setBody}
            status={status}
            limit={3000}
          />
        </Box>
        <Group position="right">
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
      </Box>
    );
  } else {
    content = (
      <Box sx={{ display: "flex", width: "100%" }} py={8}>
        <Flex justify="center" direction="column" sx={{ width: "100%" }}>
          <Group>
            <Text size={12} color="gray.6">
              Posted by{" "}
              <Text
                component={Link}
                to={`/profile/${post.user._id}`}
                className={classes.link}
              >
                {post.user.username}
              </Text>{" "}
              {dayjs(post.createdAt).fromNow()}
            </Text>
          </Group>
          <Text size={20} weight="bold" mb={8}>
            {post.title}
          </Text>
          <RichTextContent>{post.body}</RichTextContent>
          {user && user._id === post.user._id && !isDeleting && (
            <Group position="right" mt={16}>
              <Button
                color="yellow"
                size="xs"
                onClick={() => setIsEditing(true)}
                compact
              >
                Edit
              </Button>
              <Button
                color="red"
                size="xs"
                onClick={() => setIsDeleting(true)}
                compact
              >
                Delete
              </Button>
            </Group>
          )}
          {isDeleting && (
            <Box mt={16}>
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Are you sure?"
                color="red"
              >
                This action cannot be undone. Do you want to delete this post?
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
        </Flex>
      </Box>
    );
  }

  if (status === "rejected") {
    toast.error(error);
  }

  return (
    <Paper key={post._id} px={16} sx={{ display: "flex" }}>
      <Stack py={4} sx={{ gap: 0 }}>
        <ActionIcon
          onClick={() => handleRate(1)}
          variant={userLiked ? "filled" : "subtle"}
        >
          <IconArrowUp size={18} />
        </ActionIcon>
        <Text align="center" size={16} my={16}>
          {post.likes.length - post.dislikes.length <= 0
            ? 0
            : post.likes.length - post.dislikes.length}
        </Text>
        <ActionIcon
          onClick={() => handleRate(-1)}
          variant={userDisliked ? "filled" : "subtle"}
        >
          <IconArrowDown size={18} />
        </ActionIcon>
      </Stack>

      <Divider mx={16} orientation="vertical" />

      {content}
    </Paper>
  );
};

export { PostCard };
