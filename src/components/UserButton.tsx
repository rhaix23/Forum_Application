import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    cursor: "default",
    marginBottom: 16,
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  name: string;
  role: string;
  icon?: React.ReactNode;
}

export const UserButton = ({
  name,
  role,
  icon,
  ...others
}: UserButtonProps) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={null} alt={name} radius="xl">
          {name.at(0)}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {role}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};
