import {
  Button,
  Checkbox,
  Group,
  Modal,
  NativeSelect,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateSubcategory } from "../features/subcategory/subcategoryThunks";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { RootState, useAppDispatch } from "../store";
import { IPopulatedSubcategory } from "../types/subcategory.types";

interface IProps {
  subcategory: IPopulatedSubcategory;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const UpdateSubcategoryModal = ({
  subcategory,
  opened,
  setOpened,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const { status } = useSelector((state: RootState) => state.subcategory);
  const [name, setName] = useState(subcategory.name);
  const [description, setDescription] = useState(subcategory.description);
  const [category, setCategory] = useState(subcategory.category.name);
  const [allowUsersToPost, setAllowUsersToPost] = useState(
    subcategory.allowUsersToPost
  );

  const handleSubmit = async () => {
    const categoryFound = categories.find((c) => c.name === category);

    if (!categoryFound) {
      toast.error("Subcategory not found");
      return;
    }

    await dispatch(
      updateSubcategory({
        subcategoryId: subcategory._id,
        name,
        description,
        categoryId: categoryFound._id,
        allowUsersToPost: allowUsersToPost as boolean,
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
      title="Update Category"
      centered
    >
      <TextInput
        label="ID"
        size="xs"
        value={subcategory._id}
        readOnly
        disabled
      />
      <TextInput
        placeholder="Enter the subcategory name"
        label="Name"
        size="xs"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        withAsterisk
      />
      <TextInput
        placeholder="Enter the description"
        label="Description"
        size="xs"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <NativeSelect
        data={categories.map((category) => category.name)}
        label="Category"
        description="Select the category for this subcategory"
        size="xs"
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
        withAsterisk
      />
      <Checkbox
        label="Allow users to post"
        checked={allowUsersToPost}
        onChange={(event) => setAllowUsersToPost(event.currentTarget.checked)}
        mt={16}
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
