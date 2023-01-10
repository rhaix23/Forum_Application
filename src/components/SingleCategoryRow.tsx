import { ActionIcon, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons";
import { useReducer } from "react";
import { deleteCategory } from "../features/category/categoryThunks";
import {
  ActionTypes,
  modalReducer,
  modalState,
} from "../reducers/modalReducer";
import { useAppDispatch } from "../store";
import { ICategory } from "../types/category.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { CopyButton } from "./CopyButton";
import { UpdateCategoryModal } from "./UpdateCategoryModal";

interface IProps {
  category: ICategory;
}

export const SingleCategoryRow = ({ category }: IProps) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useReducer(modalReducer, modalState);

  return (
    <>
      <UpdateCategoryModal
        category={category}
        opened={modal.editModalIsOpened}
        setOpened={setModal}
      />
      <ConfirmationModal
        opened={modal.deleteModalIsOpened}
        setOpened={setModal}
        handleClick={async () => {
          await dispatch(deleteCategory({ categoryId: category._id }));
          setModal({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false });
        }}
      />
      <tr>
        <td>
          <CopyButton copyValue={category._id} displayValue={category._id} />
        </td>
        <td>
          <Text>{category.name}</Text>
        </td>
        <td>
          {category.subcategories.map((subcategory) => (
            <Text key={subcategory._id}>{subcategory.name}</Text>
          ))}
        </td>
        <td>
          <Flex justify="center" align="center">
            <Menu shadow="md">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  color="yellow"
                  icon={<IconPencil size={16} />}
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_EDIT_MODAL,
                      payload: true,
                    })
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={16} />}
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_DELETE_MODAL,
                      payload: true,
                    })
                  }
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </td>
      </tr>
    </>
  );
};
