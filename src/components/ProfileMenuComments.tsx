import { Stack } from "@mantine/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserComments } from "../features/comment/commentThunks";
import { RootState, useAppDispatch } from "../store";
import { SingleComment } from "./SingleComment";

export const ProfileMenuComments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { userComments } = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    if (id) {
      dispatch(getUserComments({ userId: id }));
    }
  }, []);

  const renderComments =
    userComments &&
    userComments.map((comment) => <SingleComment comment={comment} />);

  return <Stack>{renderComments}</Stack>;
};
