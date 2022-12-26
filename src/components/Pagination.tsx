import { Group, Pagination } from "@mantine/core";
import React from "react";
import { IQueryOptionsAction, QueryOptionTypes } from "../types/post.types";

interface IProps {
  page: number;
  totalPages: number;
  handleClick: (value: IQueryOptionsAction) => void;
}

const PaginationComponent = ({ page, totalPages, handleClick }: IProps) => {
  return (
    <Group position="right" mt={16}>
      <Pagination
        size="sm"
        page={page}
        onChange={(page) =>
          handleClick({
            type: QueryOptionTypes.ACTIVEPAGE,
            payload: page,
          })
        }
        total={totalPages}
      />
    </Group>
  );
};

export { PaginationComponent as Pagination };
