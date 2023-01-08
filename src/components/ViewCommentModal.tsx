import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import dayjs from "dayjs";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ICategory } from "../types/category.types";
import { IComment } from "../types/comment.types";
import { RichTextContent } from "./RichTextContent";

interface IProps {
  comment: IComment;
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const ViewCommentModal = ({ comment, opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="View Comment Information"
      size="lg"
      centered
    >
      <Text>ID: {comment._id}</Text>
      <Text>Created by: {comment.user.username}</Text>
      <Text>Post: {comment.post.title}</Text>
      <Text>
        Date Created: {dayjs(comment.createdAt).format("MMMM DD, YYYY")}
      </Text>
      <Text>
        Last Updated: {dayjs(comment.updatedAt).format("MMMM DD, YYYY")}
      </Text>
      <Divider my={16} />
      <RichTextContent>{comment.body}</RichTextContent>
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Close
        </Button>
      </Group>
    </Modal>
  );
};
