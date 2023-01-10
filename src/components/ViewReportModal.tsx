import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import dayjs from "dayjs";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { IReport } from "../types/reports.types";

interface IProps {
  report: IReport;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const ViewReportModal = ({ report, opened, setOpened }: IProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_VIEW_MODAL, payload: false })
      }
      title="View Report Informaton"
      size="md"
      centered
    >
      <Text>ID: {report._id}</Text>
      <Text>Reported by: {report.user.username}</Text>
      <Text>Report Type: {report.reportedObjectType}</Text>
      <Text>Report Target ID: {report.reportedObjectId}</Text>
      <Text>Reason: {report.reason}</Text>
      <Text>Status: {report.status}</Text>
      <Text>{`Date Created: ${dayjs(report.createdAt).format(
        "MMMM DD, YYYY"
      )}`}</Text>
      <Divider my={16} />
      <Text mb={8} sx={{ textDecoration: "underline" }}>
        Report Description
      </Text>
      <Text>{report.description}</Text>
      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_VIEW_MODAL, payload: false })
          }
        >
          Close
        </Button>
      </Group>
    </Modal>
  );
};
