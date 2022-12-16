import { Button, Group, Menu, Paper, Text } from "@mantine/core";
import { IconClockHour5, IconArrowsSort } from "@tabler/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CreatePostModal } from ".";
import { RootState } from "../store";

const PostsOptions = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

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
              Newest
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Newest</Menu.Item>
            <Menu.Item>Oldest</Menu.Item>
            <Menu.Item>Most Upvoted</Menu.Item>
            <Menu.Item>Most Downvoted</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              leftIcon={<IconClockHour5 size={16} />}
              size="xs"
              variant="outline"
            >
              Today
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Today</Menu.Item>
            <Menu.Item>This Week</Menu.Item>
            <Menu.Item>This Month</Menu.Item>
            <Menu.Item>this Year</Menu.Item>
            <Menu.Item>All Time</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};

export { PostsOptions };
