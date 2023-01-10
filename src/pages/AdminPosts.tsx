import {
  Box,
  Button,
  Flex,
  Group,
  NativeSelect,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Pagination, SinglePostRow } from "../components";
import { getPosts } from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";
import { DateRangePicker } from "@mantine/dates";
import { getSubcategories } from "../features/subcategory/subcategoryThunks";
import {
  ISort,
  queryReducer,
  queryState,
  QueryTypes,
} from "../reducers/queryReducer";
import { toast } from "react-toastify";

const AdminPosts = () => {
  const dispatch = useAppDispatch();
  const { posts, pages, status } = useSelector(
    (state: RootState) => state.post
  );
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);
  // const []

  useEffect(() => {
    dispatch(getSubcategories());
  }, []);

  useEffect(() => {
    dispatch(getPosts({ ...queryOptions }));
  }, [queryOptions.activePage, queryOptions.limit, queryOptions.sort]);

  const handleGetPosts = () => {
    if (queryOptions.searchBy === "id") {
      const regex = /^[a-fA-F0-9]{24}$/;
      if (!regex.test(queryOptions.searchValue)) {
        toast.error("Invalid id");
        return;
      }
    }
    dispatch(getPosts({ ...queryOptions }));
  };

  return (
    <Box>
      <Box>
        <Flex mb={8} gap={16}>
          <NativeSelect
            data={["", "id", "title", "user", "subcategory"]}
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
              label={
                queryOptions.searchBy === "id"
                  ? "Post ID"
                  : queryOptions.searchBy === "title"
                  ? "Post Title"
                  : queryOptions.searchBy === "subcategory"
                  ? "Subcategory ID"
                  : "User ID"
              }
              value={queryOptions.searchValue}
              onChange={(e) =>
                setQueryOptions({
                  type: QueryTypes.SEARCH_VALUE,
                  payload: e.currentTarget.value,
                })
              }
              placeholder={
                queryOptions.searchBy === "id" ||
                queryOptions.searchBy === "user" ||
                queryOptions.searchBy === "subcategory"
                  ? "e.g., 63af45d41363a41afeb241db"
                  : queryOptions.searchBy === "title"
                  ? "Enter post title"
                  : ""
              }
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
            onClick={handleGetPosts}
            size="xs"
            leftIcon={<IconSearch size={14} />}
            loading={status === "pending"}
          >
            Search
          </Button>
        </Group>
      </Box>

      <Table
        verticalSpacing="xs"
        fontSize="xs"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post) => <SinglePostRow key={post._id} post={post} />)}
        </tbody>
      </Table>

      {posts.length === 0 && (
        <Text align="center" mt={32}>
          No data matches the specified search term or date range.
        </Text>
      )}

      <Pagination
        page={queryOptions.activePage}
        totalPages={pages}
        handleClick={setQueryOptions}
        type={QueryTypes.ACTIVE_PAGE}
      />
    </Box>
  );
};

export default AdminPosts;
