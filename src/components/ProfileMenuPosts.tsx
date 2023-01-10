import { Stack } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";
import { PreviewPostCard } from "./PreviewPostCard";

export const ProfileMenuPosts = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { userPosts, status } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getUserPosts({ userId: id }));
    }
  }, []);

  const renderPosts =
    userPosts &&
    userPosts.map((post) => <PreviewPostCard key={post._id} post={post} />);

  return <Stack>{renderPosts}</Stack>;
};
