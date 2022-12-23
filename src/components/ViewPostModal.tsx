import { Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ICategory } from "../types/category.types";
import { IComment } from "../types/comment.types";
import { IPost } from "../types/post.types";
import { RichTextContent } from "./RichTextContent";

interface IProps {
  post: IPost;
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const ViewPostModal = ({ post, opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={post.title}
      size="lg"
      centered
    >
      <RichTextContent>{post.body}</RichTextContent>
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Close
        </Button>
      </Group>
    </Modal>
  );
};
