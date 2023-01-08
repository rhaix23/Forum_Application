import { Button, Flex, Group, Menu, Stack, Text } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostComments } from "../features/comment/commentThunks";
import {
  ISort,
  queryReducer,
  queryState,
  QueryTypes,
} from "../reducers/adminPostsQueryReducer";
import { RootState, useAppDispatch } from "../store";
import { QueryOptionTypes } from "../types/post.types";
import { Pagination } from "./Pagination";
import { SingleComment } from "./SingleComment";

export const PostComments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { comments, pages, status } = useSelector(
    (state: RootState) => state.comment
  );
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  const handleSort = (sortText: string, sort: string) => {
    if (id) {
      setQueryOptions({
        type: QueryTypes.SORT,
        payload: { text: sortText, value: sort } as ISort,
      });
    }
  };

  useEffect(() => {
    if (id) {
      const { sort, activePage } = queryOptions;
      dispatch(
        getPostComments({
          id,
          sort: sort.value,
          page: activePage,
        })
      );
    }
  }, [queryOptions]);

  return (
    <section>
      {comments?.length > 0 && (
        <Flex justify="space-between" align="center" mt={64} mb={16}>
          <Text>Comments</Text>
          <Group position="right">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  leftIcon={<IconArrowsSort size={16} />}
                  size="xs"
                  variant="outline"
                  sx={{ textTransform: "capitalize" }}
                >
                  {queryOptions.sort.text}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => handleSort("Newest", "-createdAt")}>
                  Newest
                </Menu.Item>
                <Menu.Item onClick={() => handleSort("Oldest", "createdAt")}>
                  Oldest
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      )}

      <Stack>
        {comments?.map((comment) => (
          <SingleComment key={comment._id} comment={comment} />
        ))}
      </Stack>

      {pages > 1 && (
        <Pagination
          page={queryOptions.activePage}
          totalPages={pages}
          handleClick={setQueryOptions}
          type={QueryOptionTypes.ACTIVEPAGE}
        />
      )}
    </section>
  );
};
