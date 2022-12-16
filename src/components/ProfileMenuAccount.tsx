import { Box, Button, Group, PasswordInput, Text } from "@mantine/core";

const ProfileMenuAccount = () => {
  return (
    <Box>
      <Text weight={500} size={20} mb={16}>
        Change Password
      </Text>
      <PasswordInput
        mb={8}
        placeholder="Current Password"
        label="Current Password"
      />
      <PasswordInput mb={8} placeholder="New Password" label="New Password" />
      <PasswordInput
        mb={16}
        placeholder="Confirm New Password"
        label="Confirm New Password"
      />
      <Group position="right">
        <Button size="xs">Submit</Button>
      </Group>
    </Box>
  );
};

export { ProfileMenuAccount };
