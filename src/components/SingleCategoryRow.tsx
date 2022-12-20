import { ActionIcon, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { ICategory } from "../types/category.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { UpdateCategoryModal } from "./UpdateCategoryModal";

interface IProps {
  category: ICategory;
}

export const SingleCategoryRow = ({ category }: IProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <UpdateCategoryModal
        category={category}
        opened={openEditModal}
        setOpened={setOpenEditModal}
      />
      <ConfirmationModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        handleClick={() => console.log("hello")}
      />
      <tr>
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
