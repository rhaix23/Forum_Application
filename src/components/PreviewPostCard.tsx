import {
  ActionIcon,
  Box,
  createStyles,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowUp, IconArrowDown, IconMessageDots } from "@tabler/icons";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { IPost } from "../types/post.types";
import { toast } from "react-toastify";
import {
  deletePostRate,
  ratePost,
  updatePostRate,
} from "../features/post/postThunks";
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

const PreviewPostCard = ({ post }: IProps) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

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

  return (
    <Paper
      key={post._id}
      shadow="xs"
      px={16}
      withBorder
      sx={{ display: "flex" }}
    >
      <Stack py={4} sx={{ gap: 0 }}>
        <ActionIcon
          size="xs"
          onClick={() => handleRate(1)}
          variant={userLiked ? "filled" : "subtle"}
        >
          <IconArrowUp size={14} />
        </ActionIcon>
        <Text align="center" size={14}>
          {post.likes.length - post.dislikes.length <= 0
            ? 0
            : post.likes.length - post.dislikes.length}
        </Text>
        <ActionIcon
          size="xs"
          onClick={() => handleRate(-1)}
          variant={userDisliked ? "filled" : "subtle"}
        >
          <IconArrowDown size={14} />
        </ActionIcon>
      </Stack>
      <Divider mx={16} orientation="vertical" />
      <Box
        sx={{ display: "flex", width: "100%" }}
        component={Link}
        to={`/post/${post._id}`}
      >
        <Flex justify="center" direction="column" sx={{ width: "100%" }}>
          <Text weight="bold" mb={4}>
            {post.title}
          </Text>
          <Group>
            <Text size={12} color="gray.6">
              Posted by{" "}
              <Text
                className={classes.link}
                component={Link}
                to={`/profile/${post.user._id}`}
              >
                {post.user.username}
              </Text>{" "}
              {dayjs(post.createdAt).fromNow()}
            </Text>
            <Text size={12} color="gray.6">
              {post.comments.length} <IconMessageDots size={12} />
            </Text>
          </Group>
        </Flex>
      </Box>
    </Paper>
  );
};

export { PreviewPostCard };
