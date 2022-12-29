import {
  Box,
  Button,
  Flex,
  Group,
  NativeSelect,
  Table,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Pagination, SinglePostRow } from "../components";
import { getSubcategories } from "../features/category/categoryThunks";
import { getPosts } from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import dayjs from "dayjs";

export interface IQueryState {
  searchType: "title" | "creator";
  searchValue: string;
  startDate: Date;
  endDate: Date;
  activePage: number;
}

export enum QueryTypes {
  SEARCH_TYPE = "SEARCH_TYPE",
  SEARCH_VALUE = "SEARCH_VALUE",
  START_DATE = "START_DATE",
  END_DATE = "END_DATE",
  ACTIVE_PAGE = "ACTIVE_PAGE",
}

interface IQueryActions {
  type: QueryTypes;
  payload: string | Date | number;
}

const queryState: IQueryState = {
  searchType: "title",
  searchValue: "",
  startDate: new Date(),
  endDate: new Date(),
  activePage: 1,
};

const queryReducer = (state: IQueryState, action: IQueryActions) => {
  switch (action.type) {
    case QueryTypes.SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload as "title" | "creator",
      };
    case QueryTypes.SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload as string,
      };
    case QueryTypes.START_DATE:
      return {
        ...state,
        startDate: action.payload as Date,
      };
    case QueryTypes.END_DATE:
      return {
        ...state,
        endDate: action.payload as Date,
      };
    case QueryTypes.ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload as number,
      };
    default:
      return state;
  }
};

const AdminPosts = () => {
  const dispatch = useAppDispatch();
  const { posts, count, pages } = useSelector((state: RootState) => state.post);
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  useEffect(() => {
    dispatch(getSubcategories());
  }, []);

  useEffect(() => {
    dispatch(
      getPosts({
        searchType: queryOptions.searchType,
        searchValue: queryOptions.searchValue,
        startDate: queryOptions.startDate,
        endDate: queryOptions.endDate,
        activePage: queryOptions.activePage,
      })
    );
  }, [queryOptions.activePage]);

  return (
    <Box>
      <Box>
        <Flex mb={16} gap={8}>
          <NativeSelect
            value={queryOptions.searchType}
            onChange={(e) =>
              setQueryOptions({
                type: QueryTypes.SEARCH_TYPE,
                payload: e.currentTarget.value,
              })
            }
            size="xs"
            data={["Title", "Creator"]}
          />
          <TextInput
            value={queryOptions.searchValue}
            onChange={(e) =>
              setQueryOptions({
                type: QueryTypes.SEARCH_VALUE,
                payload: e.currentTarget.value,
              })
            }
            placeholder="Enter search term"
            size="xs"
            sx={{ flex: 1 }}
          />
        </Flex>
        <DateRangePicker
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
          mb={16}
        />
        <Group position="right" mb={16}>
          <Button
            onClick={() => {
              dispatch(
                getPosts({
                  searchType: queryOptions.searchType,
                  searchValue: queryOptions.searchValue,
                  startDate: queryOptions.startDate,
                  endDate: queryOptions.endDate,
                  activePage: queryOptions.activePage,
                })
              );
            }}
            size="xs"
            leftIcon={<IconSearch size={14} />}
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
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>Creator</th>
            <th style={{ textAlign: "center" }}>Locked</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <SinglePostRow key={post._id} post={post} />
          ))}
        </tbody>
      </Table>

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
