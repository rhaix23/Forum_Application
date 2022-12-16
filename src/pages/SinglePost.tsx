import { Box, Button, Divider, Flex, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CreateComment, PostComments } from "../components";
import { Loader } from "../components/Loader";
import { PostCard } from "../components/PostCard";
import { getSinglePost } from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";

const SinglePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, status } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost({ id }));
    }
  }, []);

  return (
    <>
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
      <CreateComment />
      <PostComments />
    </>
  );
};

export { SinglePost };
