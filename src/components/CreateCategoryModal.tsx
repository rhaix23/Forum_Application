import { Button, Group, Modal, TextInput } from "@mantine/core";
import { Dispatch, useState } from "react";
import { createCategory } from "../features/category/categoryThunks";
import { useAppDispatch } from "../store";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const CreateCategoryModal = ({ opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    dispatch(createCategory({ name }));
    setName("");
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Category"
      centered
    >
      <TextInput
        placeholder="Enter the category name"
        label="Name"
        size="xs"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        withAsterisk
      />
      <Group position="right" mt={16}>
        <Button size="xs" onClick={handleSubmit}>
          Create
        </Button>
      </Group>
    </Modal>
  );
};
