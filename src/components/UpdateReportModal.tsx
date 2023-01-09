import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  NativeSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateReport } from "../features/report/reportThunks";
import { updateSubcategory } from "../features/subcategory/subcategoryThunks";
import { updateUser } from "../features/user/userThunks";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { RootState, useAppDispatch } from "../store";
import { IReport, ReportStatus } from "../types/reports.types";
import { IPopulatedSubcategory } from "../types/subcategory.types";
import { IUser } from "../types/user.types";
import { RichTextEditor } from "./RichTextEditor";

interface IProps {
  report: IReport;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const UpdateReportModal = ({ report, opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.report);
  const [reportStatus, setReportStatus] = useState(report.status || "");

  const handleSubmit = async () => {
    await dispatch(
      updateReport({
        reportId: report._id,
        status: reportStatus as ReportStatus,
      })
    );
    setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false });
  };

  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
      }
      title="Update Report Information"
      size="lg"
      centered
    >
      <TextInput label="ID" size="xs" value={report._id} readOnly disabled />

      <NativeSelect
        data={["pending", "closed", "resolved"]}
        label="Select Report Status"
        value={reportStatus}
        onChange={(e) => setReportStatus(e.currentTarget.value as ReportStatus)}
        size="xs"
        withAsterisk
      />

      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
          }
          disabled={status === "pending"}
        >
          Cancel
        </Button>
        <Button size="xs" onClick={handleSubmit} loading={status === "pending"}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
