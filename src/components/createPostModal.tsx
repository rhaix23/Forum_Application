import { Box, Button, Group, Modal, TextInput } from "@mantine/core";
import { Dispatch, FormEvent, FormEventHandler, useState } from "react";
import { RootState, useAppDispatch } from "../store";
import { RichTextEditor } from ".";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../features/post/postThunks";
import { useSelector } from "react-redux";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostModal = ({ opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { status } = useSelector((state: RootState) => state.post);

  const clearAllFields = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(createPost({ title, body: content, subcategoryId: id }));
      clearAllFields();
      setOpened(false);
    }
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        setOpened(false);
        clearAllFields();
      }}
      title="Create a new post"
      size="xl"
      closeOnClickOutside={false}
    >
      <form onSubmit={handleSubmit}>
        <Box mb={16}>
          <TextInput
            mb={8}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Enter post title"
            required
          />
          <RichTextEditor
            content={content}
            setContent={setContent}
            status={status}
            limit={3000}
          />
        </Box>
        <Group position="right">
          <Button type="submit" size="xs">
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export { CreatePostModal };
