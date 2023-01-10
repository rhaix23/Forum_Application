import { Stack } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPosts } from "../features/post/postSlice";
import { getUserPosts } from "../features/post/postThunks";
import { queryReducer, queryState, QueryTypes } from "../reducers/queryReducer";
import { RootState, useAppDispatch } from "../store";
import { IPost } from "../types/post.types";
import { Pagination } from "./Pagination";
import { PreviewPostCard } from "./PreviewPostCard";

export const ProfileMenuPosts = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { posts, pages } = useSelector((state: RootState) => state.post);
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  useEffect(() => {
    if (id) {
      clearPosts();
      dispatch(getUserPosts({ userId: id, query: queryOptions }));
    }
  }, []);

  const renderPosts =
    posts &&
    posts.map((post) => (
      <PreviewPostCard key={post._id} post={post as IPost} />
    ));

  return (
    <Stack>
      {posts &&
        posts.map((post) => (
          <PreviewPostCard key={post._id} post={post as IPost} />
        ))}

      {pages > 1 && (
        <Pagination
          page={queryOptions.activePage}
          totalPages={pages}
          handleClick={setQueryOptions}
          type={QueryTypes.ACTIVE_PAGE}
        />
      )}
    </Stack>
  );
};
