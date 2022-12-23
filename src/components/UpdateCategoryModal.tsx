import { Button, Group, Modal, TextInput } from "@mantine/core";
import { Dispatch, useState } from "react";
import { updateCategory } from "../features/category/categoryThunks";
import { useAppDispatch } from "../store";
import { ICategory } from "../types/category.types";

interface IProps {
  category: ICategory;
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateCategoryModal = ({
  category,
  opened,
  setOpened,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(category.name);

  const handleUpdate = () => {
    dispatch(updateCategory({ categoryId: category._id, name }));
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Update Category"
      centered
    >
      <TextInput label="ID" size="xs" value={category._id} readOnly disabled />
      <TextInput
        placeholder="Enter the category name"
        label="Name"
        size="xs"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        withAsterisk
      />
      <Group position="right" mt={16}>
        <Button size="xs" color="gray" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button size="xs" onClick={handleUpdate}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
