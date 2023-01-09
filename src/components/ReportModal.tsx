import {
  Button,
  Group,
  Modal,
  NativeSelect,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { submitReport } from "../features/report/reportThunks";
import { RootState, useAppDispatch } from "../store";
import { ISubmitReportReq, ReportType } from "../types/reports.types";
import { verifyId } from "../utils/verifyId";

const REPORT_SUBJECTS = [
  "",
  "Spam or inappropriate content",
  "Harassment or bullying",
  "Hateful or discriminatory language",
  "Intellectual property violation",
  "Personal information",
  "Other",
];

interface IProps {
  reportedObjectType: ReportType;
  reportedObjectId: string;
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

export const ReportModal = ({
  reportedObjectType,
  reportedObjectId,
  opened,
  setOpened,
}: IProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!reason || !user || !reportedObjectId || !reportedObjectType) {
      toast.error("Please fill all the required fields.");
      return;
    }

    const isValidReportedId = verifyId(reportedObjectId);

    if (!isValidReportedId) {
      toast.error("Invalid reported ID.");
      return;
    }

    await dispatch(
      submitReport({
        user: user._id,
        reason,
        description,
        reportedObjectType,
        reportedObjectId,
      })
    );

    setReason("");
    setDescription("");
    setOpened((state) => !state);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Submit a Report"
      centered
    >
      <NativeSelect
        data={REPORT_SUBJECTS}
        label="Reason"
        size="xs"
        value={reason}
        onChange={(e) => setReason(e.currentTarget.value)}
        withAsterisk
      />
      <Textarea
        label="Describe the issue"
        description="Help us in solving the report by describing the issue"
        size="xs"
        autosize={false}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        minRows={5}
      />
      <Group position="right" mt={16}>
        <Button size="xs" onClick={handleSubmit}>
          Submit
        </Button>
      </Group>
    </Modal>
  );
};
