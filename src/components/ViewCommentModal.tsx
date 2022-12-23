import { Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
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
      title="View Comment"
      size="lg"
      centered
    >
      <RichTextContent>{comment.body}</RichTextContent>
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Close
        </Button>
      </Group>
    </Modal>
  );
};
