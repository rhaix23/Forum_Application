import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Dispatch } from "react";
import { IAdminPagePost } from "../types/post.types";
import { RichTextContent } from "./RichTextContent";

interface IProps {
  post: IAdminPagePost;
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const ViewPostModal = ({ post, opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="View Post's Informaton"
      size="lg"
      centered
    >
      <Text>ID: {post._id}</Text>
      <Text>{`Created by: ${post.user.username}`}</Text>
      <Text>{`Subcategory: ${post.subcategory.name}`}</Text>
      <Text>{`Locked: ${post.isLocked}`}</Text>
      <Text>{`Removed: ${post.isRemoved}`}</Text>
      <Text>{`Date Created: ${dayjs(post.createdAt).format(
        "MMMM DD, YYYY"
      )}`}</Text>
      <Divider my={16} />
      <Text mb={8} fz="xl" fw="bold">
        {post.title}
      </Text>
      <RichTextContent>{post.body}</RichTextContent>
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Close
        </Button>
      </Group>
    </Modal>
  );
};
