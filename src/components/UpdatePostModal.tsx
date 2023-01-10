import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  NativeSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editPost } from "../features/post/postThunks";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { RootState, useAppDispatch } from "../store";
import { IAdminPagePost, IPost } from "../types/post.types";
import { RichTextEditor } from "./RichTextEditor";

interface IProps {
  post: IAdminPagePost;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const UpdatePostModal = ({ post, opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.post);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [subcategory, setSubcategory] = useState(post.subcategory.name);
  const [isLocked, setIsLocked] = useState(post.isLocked);

  const handleSubmit = async () => {
    const subcategoryFound = subcategories.find((s) => s.name === subcategory);

    if (!subcategoryFound) {
      toast.error("Subcategory not found");
      return;
    }

    await dispatch(
      editPost({
        id: post._id,
        title,
        body,
        subcategoryId: subcategoryFound._id,
        isLocked,
      })
    );

    setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false });
  };

  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
      }
      title="Update Post"
      size="lg"
      centered
    >
      <TextInput label="ID" size="xs" value={post._id} readOnly disabled />
      <TextInput
        placeholder="Enter the post title"
        label="Title"
        size="xs"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        mb={8}
        withAsterisk
      />
      <Box>
        <Text size={12} weight={500}>
          Body
        </Text>
        <RichTextEditor content={body} setContent={setBody} status={status} />
      </Box>
      <NativeSelect
        data={subcategories.map((subcategory) => subcategory.name)}
        label="Subcategory"
        description="Select the subcategory for this post"
        size="xs"
        value={subcategory}
        onChange={(e) => setSubcategory(e.currentTarget.value)}
        mb={16}
        withAsterisk
      />
      <Checkbox
        label="Lock the post"
        checked={isLocked}
        onChange={(event) => setIsLocked(event.currentTarget.checked)}
      />
      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
          }
          disabled={status === "pending"}
        >
          Cancel
        </Button>
        <Button size="xs" onClick={handleSubmit} loading={status === "pending"}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
