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
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Pagination, SingleUserRow } from "../components";
import { getUsers } from "../features/user/userThunks";
import { RootState, useAppDispatch } from "../store";
import {
  ISort,
  queryReducer,
  queryState,
  QueryTypes,
} from "../reducers/queryReducer";
import { DateRangePicker } from "@mantine/dates";
import { IconSearch } from "@tabler/icons";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { users, pages, status } = useSelector(
    (state: RootState) => state.user
  );
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  useEffect(() => {
    dispatch(getUsers({ ...queryOptions }));
  }, []);

  return (
    <Box>
      <Box>
        <Flex mb={16} gap={16}>
          <NativeSelect
            data={["", "id", "username"]}
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
              label={queryOptions.searchBy === "id" ? "User ID" : "Username"}
              value={queryOptions.searchValue}
              onChange={(e) =>
                setQueryOptions({
                  type: QueryTypes.SEARCH_VALUE,
                  payload: e.currentTarget.value,
                })
              }
              placeholder={
                queryOptions.searchBy === "id"
                  ? "e.g., 63af45d41363a41afeb241db"
                  : "e.g., john_doe"
              }
              size="xs"
              sx={{ flex: 2 }}
            />
          )}
          <NativeSelect
            data={["Newest", "Oldest"]}
            label="Sort by"
            size="xs"
            value={queryOptions.sort.text}
            onChange={(e) => {
              const text = e.currentTarget.value;
              let value = queryOptions.sort.value as string;
              if (text === "Newest") value = "-createdAt";
              if (text === "Oldest") value = "createdAt";
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
              dispatch(getUsers({ ...queryOptions }));
            }}
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
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <SingleUserRow key={user._id} user={user} />
          ))}
        </tbody>
      </Table>

      {users.length === 0 && (
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

export default AdminUsers;
