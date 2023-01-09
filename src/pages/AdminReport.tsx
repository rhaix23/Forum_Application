import {
  Box,
  Button,
  Flex,
  Group,
  NativeSelect,
  Table,
  TextInput,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { IconSearch } from "@tabler/icons";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { SingleReportRow } from "../components";
import { getReports } from "../features/report/reportThunks";
import {
  ISort,
  queryReducer,
  queryState,
  QueryTypes,
} from "../reducers/adminPostsQueryReducer";
import { RootState, useAppDispatch } from "../store";

const AdminReport = () => {
  const dispatch = useAppDispatch();
  const { reports, status } = useSelector((state: RootState) => state.report);
  const [queryOptions, setQueryOptions] = useReducer(queryReducer, queryState);

  useEffect(() => {
    dispatch(getReports(queryOptions));
  }, []);

  return (
    <Box>
      <Box>
        <Flex mb={8} gap={16}>
          <NativeSelect
            data={["", "id"]}
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
              label="Report ID"
              value={queryOptions.searchValue}
              onChange={(e) =>
                setQueryOptions({
                  type: QueryTypes.SEARCH_VALUE,
                  payload: e.currentTarget.value,
                })
              }
              placeholder="e.g., 63af45d41363a41afeb241db"
              size="xs"
              sx={{ flex: 2 }}
            />
          )}
        </Flex>
        <Flex gap={16}>
          <NativeSelect
            data={["", "User", "Comment", "Post"]}
            label="Report Type"
            size="xs"
            sx={{ flex: 1 }}
            value={queryOptions.reportType}
            onChange={(e) =>
              setQueryOptions({
                type: QueryTypes.REPORT_TYPE,
                payload: e.currentTarget.value,
              })
            }
          />
          <NativeSelect
            data={["", "Pending", "Closed", "Resolved"]}
            label="Status"
            size="xs"
            sx={{ flex: 1 }}
            value={queryOptions.status}
            onChange={(e) =>
              setQueryOptions({
                type: QueryTypes.STATUS,
                payload: e.currentTarget.value,
              })
            }
          />
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
            onClick={() => dispatch(getReports(queryOptions))}
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
            <th style={{ textAlign: "center" }}>Reported Type</th>
            <th style={{ textAlign: "center" }}>Reported ID</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <SingleReportRow key={report._id} report={report} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default AdminReport;
