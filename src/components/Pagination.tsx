import { Group, Pagination } from "@mantine/core";
import React from "react";
import { IQueryOptionsAction, QueryOptionTypes } from "../types/post.types";

interface IProps {
  page: number;
  totalPages: number;
  handleClick: (value: any) => void;
  type: string;
}

const PaginationComponent = ({
  page,
  totalPages,
  type,
  handleClick,
}: IProps) => {
  if (totalPages === 1) return null;

  return (
    <Group position="right" mt={16}>
      <Pagination
        size="sm"
        page={page}
        onChange={(page) =>
          handleClick({
            type,
            payload: page,
          })
        }
        total={totalPages}
      />
    </Group>
  );
};

export { PaginationComponent as Pagination };
