import { ActionIcon, createStyles, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons";
import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import {
  ActionTypes,
  modalReducer,
  modalState,
} from "../reducers/modalReducer";
import { useAppDispatch } from "../store";
import { IReport } from "../types/reports.types";
import { CopyButton } from "./CopyButton";
import { UpdateReportModal } from "./UpdateReportModal";
import { ViewReportModal } from "./ViewReportModal";

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.blue[7],
    ":hover": {
      color: theme.colors.blue[9],
      textDecoration: "underline",
    },
  },
}));

interface IProps {
  report: IReport;
}

export const SingleReportRow = ({ report }: IProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [modal, setModal] = useReducer(modalReducer, modalState);

  return (
    <>
      <ViewReportModal
        opened={modal.viewModalIsOpened}
        setOpened={setModal}
        report={report}
      />
      <UpdateReportModal
        opened={modal.editModalIsOpened}
        setOpened={setModal}
        report={report}
      />
      <tr>
        <td>
          <CopyButton copyValue={report._id} displayValue={report._id} />
        </td>
        <td>{report.reportedObjectType}</td>
        <td>
          <CopyButton
            copyValue={report.reportedObjectId}
            displayValue={report.reportedObjectId}
          />
        </td>
        <td>{report.status}</td>
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
                  color="blue"
                  icon={<IconEye size={16} />}
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_VIEW_MODAL,
                      payload: true,
                    })
                  }
                >
                  View
                </Menu.Item>
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
                  // onClick={() => setOpenDeleteModal(true)}
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
