import { createStyles, Container, Group, Text, Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },

  link: {
    color: theme.colors.blue[7],
    ":hover": {
      textDecoration: "underline",
    },
  },
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="sm">
          <span>Project by </span>
          <Text className={classes.link} component={Link} to="#" mb={16}>
            Patrick Santos
          </Text>
        </Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <Button
            leftIcon={<IconBrandGithub size={18} />}
            size="md"
            variant="subtle"
            compact
            component="a"
            href="https://github.com/rhaix23/Forum_Application"
            target="_blank"
          >
            Github
          </Button>
        </Group>
      </Container>
    </div>
  );
};
