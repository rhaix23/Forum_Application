import { Group, Pagination, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostComments } from "../features/comment/commentThunks";
import { RootState, useAppDispatch } from "../store";
import { SingleComment } from "./SingleComment";

export const PostComments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { comments } = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    if (id) {
      dispatch(getPostComments({ id }));
    }
  }, []);

  if (!comments) {
    return null;
  }

  const renderComments = (
    <>
      {comments.length > 0 && <Text>Comments</Text>}
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </>
  );

  return (
    <>
      <Stack>{renderComments}</Stack>
      {comments.length > 20 && (
        <Group position="right" my={32}>
          <Pagination total={5} />
        </Group>
      )}
    </>
  );
};
