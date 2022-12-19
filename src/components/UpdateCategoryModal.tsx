import { Button, Group, Modal, TextInput } from "@mantine/core";
import { Dispatch, useState } from "react";
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
  const [name, setName] = useState(category.name);

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
        <Button size="xs">Save</Button>
      </Group>
    </Modal>
  );
};
