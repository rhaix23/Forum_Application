import { Button, Group, Menu, Paper, Text } from "@mantine/core";
import { IconClockHour5, IconArrowsSort } from "@tabler/icons";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CreatePostModal } from ".";
import { RootState } from "../store";
import { TimeFilterOptions, SortOptions } from "../types/app.types";
import {
  IQueryOptionsAction,
  IQueryOptionsState,
  QueryOptionTypes,
} from "../types/post.types";

interface IProps {
  queryOptions: IQueryOptionsState;
  setQueryOptions: Dispatch<IQueryOptionsAction>;
}

const PostsOptions = ({ queryOptions, setQueryOptions }: IProps) => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const { sort, time } = queryOptions;

  const handleSort = (sortText: string, sort: SortOptions) => {
    if (id) {
      setQueryOptions({
        type: QueryOptionTypes.SORT,
        payload: { text: sortText, value: sort },
      });
    }
  };

  const handleTime = (timeText: string, time: TimeFilterOptions) => {
    if (id) {
      setQueryOptions({
        type: QueryOptionTypes.FILTERBYTIME,
        payload: { text: timeText, value: time },
      });
    }
  };

  return (
    <Paper
      py={8}
      px={16}
      mb={16}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CreatePostModal
        opened={openCreatePostModal}
        setOpened={setOpenCreatePostModal}
      />
      {user ? (
        <Button size="xs" onClick={() => setOpenCreatePostModal(true)}>
          New Post
        </Button>
      ) : (
        <Text>Note: You need to be logged in to create a post</Text>
      )}
      <Group position="right">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              leftIcon={<IconArrowsSort size={16} />}
              size="xs"
              variant="outline"
              sx={{ textTransform: "capitalize" }}
            >
              {sort.text}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => handleSort("Newest", "-createdAt")}>
              Newest
            </Menu.Item>
            <Menu.Item onClick={() => handleSort("Oldest", "+createdAt")}>
              Oldest
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSort("Most Upvoted", "-ratingCount")}
            >
              Most Upvoted
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSort("Most Downvoted", "+ratingCount")}
            >
              Most Downvoted
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              leftIcon={<IconClockHour5 size={16} />}
              size="xs"
              variant="outline"
            >
              {time.text}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => handleTime("Today", "day")}>
              Today
            </Menu.Item>
            <Menu.Item onClick={() => handleTime("This week", "week")}>
              This Week
            </Menu.Item>
            <Menu.Item onClick={() => handleTime("This month", "month")}>
              This Month
            </Menu.Item>
            <Menu.Item onClick={() => handleTime("This year", "year")}>
              this Year
            </Menu.Item>
            <Menu.Item onClick={() => handleTime("All time", "all")}>
              All Time
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};

export { PostsOptions };
