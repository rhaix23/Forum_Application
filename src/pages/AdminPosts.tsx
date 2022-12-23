import { Box, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SinglePostRow } from "../components";
import { getSubcategories } from "../features/category/categoryThunks";
import { getPosts } from "../features/post/postThunks";
import { RootState, useAppDispatch } from "../store";

export const AdminPosts = () => {
  const dispatch = useAppDispatch();
  const { posts } = useSelector((state: RootState) => state.post);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(getSubcategories());
    dispatch(getPosts());
  }, []);

  const renderRows = posts.map((post) => (
    <SinglePostRow key={post._id} post={post} />
  ));

  return (
    <Box>
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
            <th style={{ textAlign: "center" }}>Title</th>
            <th style={{ textAlign: "center" }}>Creator</th>
            <th style={{ textAlign: "center" }}>Locked</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </Table>
    </Box>
  );
};
