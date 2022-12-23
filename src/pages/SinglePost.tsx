import { Alert, Button, Divider, Text } from "@mantine/core";
import { IconAlertCircle, IconChevronLeft } from "@tabler/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CreateComment, PostComments } from "../components";
import { PostCard } from "../components/PostCard";
import { getSinglePost } from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";

const SinglePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post } = useSelector((state: RootState) => state.post);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost({ id }));
    }
  }, []);

  return (
    <section>
      <Button
        color="gray"
        size="xs"
        mb={64}
        leftIcon={<IconChevronLeft size={14} />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {post && <PostCard post={post} />}

      <Divider variant="dotted" my={32} />

      {post?.isLocked ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Attention users"
          color="yellow"
        >
          This post has been locked and is no longer available for comments.
          Thank you for your understanding.
        </Alert>
      ) : user ? (
        <CreateComment />
      ) : (
        <Text align="center" color="gray" size={14} mb={32}>
          You must be logged in to comment
        </Text>
      )}

      <PostComments />
    </section>
  );
};

export { SinglePost };
