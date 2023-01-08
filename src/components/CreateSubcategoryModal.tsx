import { Button, Group, Modal, NativeSelect, TextInput } from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createSubcategory } from "../features/subcategory/subcategoryThunks";
import { RootState, useAppDispatch } from "../store";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const CreateSubcategoryModal = ({ opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!name || !category) {
      toast.error("Please fill all the fields");
      return;
    }
    const categoryFound = categories.find((c) => c.name === category);

    if (!categoryFound) {
      toast.error("Category not found");
      return;
    }

    dispatch(
      createSubcategory({ name, description, categoryId: categoryFound._id })
    );
    setName("");
    setDescription("");
    setCategory("");
    setOpened(false);
  };

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
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        name="name"
        withAsterisk
      />
      <TextInput
        placeholder="Enter the description"
        label="Description"
        size="xs"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        name="description"
      />
      <NativeSelect
        data={["", ...categories.map((category) => category.name)]}
        label="Category"
        description="Select the category for this subcategory"
        size="xs"
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
        name="category"
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
