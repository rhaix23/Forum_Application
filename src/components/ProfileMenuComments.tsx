import { Stack } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserComments } from "../features/comment/commentThunks";
import { queryReducer, queryState } from "../reducers/queryReducer";
import { RootState, useAppDispatch } from "../store";
import { SingleComment } from "./SingleComment";

export const ProfileMenuComments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { comments, status } = useSelector((state: RootState) => state.comment);
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  useEffect(() => {
    if (id) {
      dispatch(getUserComments({ userId: id, query: { ...queryOptions } }));
    }
  }, []);

  const renderComments =
    comments &&
    comments.map((comment, index) => (
      <SingleComment key={comment._id || index} comment={comment} />
    ));

  return <Stack>{renderComments}</Stack>;
};
