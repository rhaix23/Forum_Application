import { ActionIcon, Flex, Menu } from "@mantine/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons";
import { useReducer } from "react";
import { deleteReport } from "../features/report/reportThunks";
import {
  ActionTypes,
  modalReducer,
  modalState,
} from "../reducers/modalReducer";
import { useAppDispatch } from "../store";
import { IReport } from "../types/reports.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { CopyButton } from "./CopyButton";
import { UpdateReportModal } from "./UpdateReportModal";
import { ViewReportModal } from "./ViewReportModal";

interface IProps {
  report: IReport;
}

export const SingleReportRow = ({ report }: IProps) => {
  const dispatch = useAppDispatch();
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
      <ConfirmationModal
        opened={modal.deleteModalIsOpened}
        setOpened={setModal}
        handleClick={async () => {
          await dispatch(deleteReport({ reportId: report._id }));
          setModal({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false });
        }}
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
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_DELETE_MODAL,
                      payload: true,
                    })
                  }
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
