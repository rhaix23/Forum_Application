import { Stack } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PreviewPostCard,
  PostsOptions,
  Pagination,
  ImageWithTextAlert,
} from "../components";
import { getSubcategoryPosts } from "../features/post/postThunks";
import { AppDispatch, RootState } from "../store";
import {
  queryOptionsReducer,
  queryOptionsState,
} from "../reducers/queryOptionsReducer";
import nopostsImage from "../assets/noposts.png";
import { IPost, QueryOptionTypes } from "../types/post.types";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { posts, status, pages } = useSelector(
    (state: RootState) => state.post
  );
  const [queryOptions, setQueryOptions] = useReducer(
    queryOptionsReducer,
    queryOptionsState
  );
  const postsPerPage = 20;

  useEffect(() => {
    if (id) {
      const { time, sort, activePage } = queryOptions;
      dispatch(
        getSubcategoryPosts({
          id,
          time: time.value,
          sort: sort.value,
          page: activePage,
          limit: postsPerPage,
        })
      );
    }
  }, [queryOptions]);

  const renderPosts =
    posts &&
    posts.map((post) => (
      <PreviewPostCard key={post._id} post={post as IPost} />
    ));

  return (
    <article>
      <PostsOptions
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
      />

      {posts.length === 0 && status !== "pending" ? (
        <ImageWithTextAlert
          image={nopostsImage}
          text="There are no posts in this subcategory. Be the first to create one!"
        />
      ) : (
        <Stack>{renderPosts}</Stack>
      )}

      {pages > 1 && (
        <Pagination
          page={queryOptions.activePage}
          totalPages={pages}
          handleClick={setQueryOptions}
          type={QueryOptionTypes.ACTIVEPAGE}
        />
      )}
    </article>
  );
};

export default Posts;
