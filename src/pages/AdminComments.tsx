import { Box, Table, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SingleCommentRow } from "../components";
import { getComments } from "../features/comment/commentThunks";
import { RootState, useAppDispatch } from "../store";

export const AdminComments = () => {
  const dispatch = useAppDispatch();
  const { comments } = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    dispatch(getComments());
  }, []);

  const renderRows = comments.map((comment) => (
    <SingleCommentRow key={comment._id} comment={comment} />
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
            <th style={{ textAlign: "center" }}>Commentor</th>
            <th style={{ textAlign: "center" }}>Post</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </Table>
    </Box>
  );
};
