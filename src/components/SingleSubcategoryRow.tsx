import { ActionIcon, Flex, Menu } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons";
import { useReducer } from "react";
import { deleteSubcategory } from "../features/subcategory/subcategoryThunks";
import {
  ActionTypes,
  modalReducer,
  modalState,
} from "../reducers/modalReducer";
import { useAppDispatch } from "../store";
import { IPopulatedSubcategory } from "../types/subcategory.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { CopyButton } from "./CopyButton";
import { UpdateSubcategoryModal } from "./UpdateSubcategoryModal";

interface IProps {
  subcategory: IPopulatedSubcategory;
}

export const SingleSubcategoryRow = ({ subcategory }: IProps) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useReducer(modalReducer, modalState);

  return (
    <>
      <UpdateSubcategoryModal
        opened={modal.editModalIsOpened}
        setOpened={setModal}
        subcategory={subcategory}
      />
      <ConfirmationModal
        opened={modal.deleteModalIsOpened}
        setOpened={setModal}
        handleClick={() => {
          dispatch(deleteSubcategory({ subcategoryId: subcategory._id }));
          setModal({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false });
        }}
      />
      <tr>
        <td>
          <CopyButton
            copyValue={subcategory._id}
            displayValue={subcategory._id}
          />
        </td>
        <td>{subcategory.name}</td>
        <td>{subcategory.description}</td>
        <td>{subcategory.category.name}</td>
        <td>{String(subcategory.allowUsersToPost)}</td>
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
