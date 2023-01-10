import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateCategory } from "../features/category/categoryThunks";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { RootState, useAppDispatch } from "../store";
import { ICategory } from "../types/category.types";

interface IProps {
  category: ICategory;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const UpdateCategoryModal = ({
  category,
  opened,
  setOpened,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.category);
  const [name, setName] = useState(category.name);

  const handleUpdate = async () => {
    await dispatch(updateCategory({ categoryId: category._id, name }));
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
        <Button size="xs" onClick={handleUpdate} loading={status === "pending"}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
