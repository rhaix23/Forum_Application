import {
  Anchor,
  Box,
  createStyles,
  Flex,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PreviewPostCard, ProfileMenuAccount } from "../components";
import { RootState } from "../store";

const useStyles = createStyles((theme) => ({
  linkPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.colors.blue[9],
    },
  },
}));

const Profile = () => {
  const { classes } = useStyles();
  const { user, status } = useSelector((state: RootState) => state.user);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <Paper shadow="xs" p={16} withBorder>
      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="posts">Posts</Tabs.Tab>
          <Tabs.Tab value="comments">Comments</Tabs.Tab>
          <Tabs.Tab value="account">Account</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xs">
          <Box>
            <Box mb={32}>
              <Text align="center" weight={500} size={20}>
                {user && user.username}
              </Text>
              <Text align="center" size={12}>
                Software Engineer at Google
              </Text>
            </Box>
            <Box mb={32}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                omnis facilis corrupti modi alias nostrum quisquam consequuntur
                sed, aperiam, minima dignissimos blanditiis eaque distinctio!
                Nostrum doloribus facilis neque libero illo.
              </Text>
            </Box>
            <Box>
              <SimpleGrid cols={3} spacing={16}>
                <Anchor href="mailto:patrick@gmail.com">
                  <Paper
                    shadow="xs"
                    p={16}
                    withBorder
                    className={classes.linkPaper}
                  >
                    <ThemeIcon variant="light" mb={8}>
                      <IconMail />
                    </ThemeIcon>
                    <Text>Send me an email</Text>
                  </Paper>
                </Anchor>

                <Anchor href="https://github.com" target="_blank">
                  <Paper
                    shadow="xs"
                    p={16}
                    withBorder
                    className={classes.linkPaper}
                  >
                    <ThemeIcon variant="light" mb={8}>
                      <IconBrandGithub />
                    </ThemeIcon>
                    <Text>Check out my projects</Text>
                  </Paper>
                </Anchor>

                <Anchor href="https://ph.linkedin.com/" target="_blank">
                  <Paper
                    shadow="xs"
                    p={16}
                    withBorder
                    className={classes.linkPaper}
                  >
                    <ThemeIcon variant="light" mb={8}>
                      <IconBrandLinkedin />
                    </ThemeIcon>
                    <Text>Connect with me on LinkedIn</Text>
                  </Paper>
                </Anchor>
              </SimpleGrid>
            </Box>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="posts" pt="xs">
          <Box>
            <Text weight={500} size={20} mb={16}>
              My Posts
            </Text>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="comments" pt="xs">
          <Box>
            <Text weight={500} size={20} mb={16}>
              My Comments
            </Text>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="account" pt="xs">
          <ProfileMenuAccount />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export { Profile };
