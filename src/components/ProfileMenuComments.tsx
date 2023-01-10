import { Stack } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserComments } from "../features/comment/commentThunks";
import { queryReducer, queryState, QueryTypes } from "../reducers/queryReducer";
import { RootState, useAppDispatch } from "../store";
import { Pagination } from "./Pagination";
import { SingleComment } from "./SingleComment";

export const ProfileMenuComments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { comments, pages } = useSelector((state: RootState) => state.comment);
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  useEffect(() => {
    if (id) {
      dispatch(getUserComments({ userId: id, query: queryOptions }));
    }
  }, []);

  return (
    <Stack>
      {comments &&
        comments.map((comment, index) => (
          <SingleComment key={comment._id || index} comment={comment} />
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
