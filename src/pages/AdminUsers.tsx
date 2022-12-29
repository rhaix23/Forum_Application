import { Box, Table, Text } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SingleUserRow } from "../components";
import { getUsers } from "../features/user/userThunks";
import { RootState, useAppDispatch } from "../store";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const renderRows = users.map((user) => (
    <SingleUserRow key={user._id} user={user} />
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
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Disabled</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </Table>
    </Box>
  );
};

export default AdminUsers;
