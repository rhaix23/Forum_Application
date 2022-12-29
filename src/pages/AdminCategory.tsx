import { Box, Button, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SingleCategoryRow } from "../components";
import { CreateCategoryModal } from "../components";
import { getCategories } from "../features/category/categoryThunks";
import { RootState, useAppDispatch } from "../store";

const AdminCategory = () => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <Box>
      <CreateCategoryModal
        opened={openCreateModal}
        setOpened={setOpenCreateModal}
      />
      <Button
        mb={16}
        size="xs"
        onClick={() => setOpenCreateModal(true)}
        leftIcon={<IconPlus size={16} />}
      >
        New Category
      </Button>
      <Table
        verticalSpacing="xs"
        fontSize="xs"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Subcategories</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <SingleCategoryRow key={category._id} category={category} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default AdminCategory;
