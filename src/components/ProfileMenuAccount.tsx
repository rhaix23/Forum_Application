import { Box, Button, Group, PasswordInput, Text } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../features/user/userThunks";
import { useAppDispatch } from "../store";

const ProfileMenuAccount = () => {
  const dispatch = useAppDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(changePassword({ currentPassword, newPassword }));
  };

  return (
    <Box>
      <Text weight={500} size={20} mb={16}>
        Change Password
      </Text>
      <PasswordInput
        mb={8}
        placeholder="Current Password"
        label="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.currentTarget.value)}
      />
      <PasswordInput
        mb={8}
        placeholder="New Password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.currentTarget.value)}
      />
      <PasswordInput
        mb={16}
        placeholder="Confirm New Password"
        label="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
      />
      <Group position="right">
        <Button size="xs" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Group>
    </Box>
  );
};

export { ProfileMenuAccount };
