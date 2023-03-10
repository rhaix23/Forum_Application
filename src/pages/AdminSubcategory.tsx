import { Box, Button, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CreateSubcategoryModal, SingleSubcategoryRow } from "../components";
import { getCategories } from "../features/category/categoryThunks";
import { getSubcategories } from "../features/subcategory/subcategoryThunks";
import { RootState, useAppDispatch } from "../store";

const AdminSubcategory = () => {
  const dispatch = useAppDispatch();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, []);

  return (
    <Box>
      <CreateSubcategoryModal
        opened={openCreateModal}
        setOpened={setOpenCreateModal}
      />
      <Button
        mb={16}
        size="xs"
        onClick={() => setOpenCreateModal(true)}
        leftIcon={<IconPlus size={16} />}
      >
        New Subcategory
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
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Description</th>
            <th style={{ textAlign: "center" }}>Category</th>
            <th style={{ textAlign: "center" }}>Allow Posts</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory) => (
            <SingleSubcategoryRow
              key={subcategory._id}
              subcategory={subcategory}
            />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default AdminSubcategory;
