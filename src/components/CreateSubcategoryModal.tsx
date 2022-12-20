import { Button, Group, Modal, NativeSelect, TextInput } from "@mantine/core";
import { Dispatch } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const CreateSubcategoryModal = ({ opened, setOpened }: IProps) => {
  const { categories } = useSelector((state: RootState) => state.category);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Subcategory"
      centered
    >
      <TextInput
        placeholder="Enter the subcategory name"
        label="Name"
        size="xs"
        withAsterisk
      />
      <TextInput
        placeholder="Enter the description"
        label="Description"
        size="xs"
      />
      <NativeSelect
        data={categories.map((category) => category.name)}
        label="Category"
        description="Select the category for this subcategory"
        size="xs"
        withAsterisk
      />
      <Group position="right" mt={16}>
        <Button size="xs">Create</Button>
      </Group>
    </Modal>
  );
};
