import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  NativeSelect,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PreviewPostCard,
  Pagination,
  ImageWithTextAlert,
  CreatePostModal,
} from "../components";
import { getSubcategoryPosts } from "../features/post/postThunks";
import { AppDispatch, RootState } from "../store";
import nopostsImage from "../assets/noposts.png";
import { IPost } from "../types/post.types";
import { IconSearch, IconSettings } from "@tabler/icons";
import {
  ISort,
  queryReducer,
  queryState,
  QueryTypes,
} from "../reducers/adminPostsQueryReducer";
import { DateRangePicker } from "@mantine/dates";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const { posts, status, pages } = useSelector(
    (state: RootState) => state.post
  );
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSubcategoryPosts({ id, query: queryOptions }));
    }
  }, [queryOptions.sort, queryOptions.limit]);

  const renderPosts =
    posts &&
    posts.map((post) => (
      <PreviewPostCard key={post._id} post={post as IPost} />
    ));

  return (
    <article>
      <CreatePostModal
        opened={openCreatePostModal}
        setOpened={setOpenCreatePostModal}
      />

      {showFilters && (
        <Box>
          <Flex mb={8} gap={16}>
            <NativeSelect
              data={["", "title"]}
              label="Search by"
              size="xs"
              value={queryOptions.searchBy}
              onChange={(e) => {
                setQueryOptions({
                  type: QueryTypes.SEARCH_BY,
                  payload: e.currentTarget.value,
                });
              }}
              sx={{ flex: 1 }}
            />
            {queryOptions.searchBy !== "" && (
              <TextInput
                label="Post title"
                value={queryOptions.searchValue}
                onChange={(e) =>
                  setQueryOptions({
                    type: QueryTypes.SEARCH_VALUE,
                    payload: e.currentTarget.value,
                  })
                }
                placeholder="Enter post title"
                size="xs"
                sx={{ flex: 2 }}
              />
            )}
          </Flex>
          <Flex align="center" mb={16} gap={16}>
            <DateRangePicker
              label="Date range"
              placeholder="Pick a date range"
              value={[queryOptions.startDate, queryOptions.endDate]}
              onChange={(e) => {
                setQueryOptions({
                  type: QueryTypes.START_DATE,
                  payload: e[0] as Date,
                });
                setQueryOptions({
                  type: QueryTypes.END_DATE,
                  payload: e[1] as Date,
                });
              }}
              size="xs"
              sx={{ flex: 1 }}
            />
            <NativeSelect
              data={["Newest", "Oldest", "Most Popular", "Least Popular"]}
              label="Sort by"
              size="xs"
              value={queryOptions.sort.text}
              onChange={(e) => {
                const text = e.currentTarget.value;
                let value = queryOptions.sort.value as string;
                if (text === "Newest") value = "-createdAt";
                if (text === "Oldest") value = "createdAt";
                if (text === "Most Popular") value = "-ratingCount";
                if (text === "Least Popular") value = "ratingCount";
                setQueryOptions({
                  type: QueryTypes.SORT,
                  payload: { text, value } as ISort,
                });
              }}
            />
            <NativeSelect
              data={["10", "25", "50", "100"]}
              label="Show rows"
              size="xs"
              value={queryOptions.limit}
              onChange={(e) =>
                setQueryOptions({
                  type: QueryTypes.LIMIT,
                  payload: e.currentTarget.value,
                })
              }
            />
          </Flex>
          <Group position="right" mb={16}>
            <Button
              onClick={() => {
                if (id) {
                  dispatch(getSubcategoryPosts({ id, query: queryOptions }));
                }
              }}
              size="xs"
              leftIcon={<IconSearch size={14} />}
              loading={status === "pending"}
            >
              Search
            </Button>
          </Group>
        </Box>
      )}

      <Flex justify="space-between" align="center" mb={16}>
        {user ? (
          <Button size="xs" onClick={() => setOpenCreatePostModal(true)}>
            New Post
          </Button>
        ) : (
          <Text>Note: You need to be logged in to create a post</Text>
        )}
        <ActionIcon onClick={() => setShowFilters((state) => !state)}>
          <IconSettings size={18} />
        </ActionIcon>
      </Flex>

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
          type={QueryTypes.ACTIVE_PAGE}
        />
      )}
    </article>
  );
};

export default Posts;
