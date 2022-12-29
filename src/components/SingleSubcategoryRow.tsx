import { ActionIcon, Flex, Menu } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { deleteSubcategory } from "../features/category/categoryThunks";
import { useAppDispatch } from "../store";
import {
  IPopulatedSubcategory,
  ISubcategory,
} from "../types/subcategory.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { UpdateSubcategoryModal } from "./UpdateSubcategoryModal";

interface IProps {
  subcategory: IPopulatedSubcategory;
}

export const SingleSubcategoryRow = ({ subcategory }: IProps) => {
  const dispatch = useAppDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDelete = () => {
    dispatch(deleteSubcategory({ subcategoryId: subcategory._id }));
    setOpenDeleteModal(false);
  };

  return (
    <>
      <UpdateSubcategoryModal
        opened={openEditModal}
        setOpened={setOpenEditModal}
        subcategory={subcategory}
      />
      <ConfirmationModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        handleClick={handleDelete}
      />
      <tr>
        <td>{subcategory.name}</td>
        <td>{subcategory.description}</td>
        <td>{subcategory.category.name}</td>
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
                  onClick={() => setOpenEditModal(true)}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={16} />}
                  onClick={() => setOpenDeleteModal(true)}
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
