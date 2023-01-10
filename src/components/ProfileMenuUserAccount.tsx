import {
  Anchor,
  Box,
  Button,
  createStyles,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../features/user/userThunks";
import { RootState, useAppDispatch } from "../store";
import { CopyButton } from "./CopyButton";
import { ReportModal } from "./ReportModal";
import { RichTextContent } from "./RichTextContent";
import { RichTextEditor } from "./RichTextEditor";

const useStyles = createStyles((theme) => ({
  linkPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: theme.colors.blue[9],
    },
  },
}));

export const ProfileMenuUserAccount = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { user, profile, status } = useSelector(
    (state: RootState) => state.user
  );
  const [isEditing, setIsEditing] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  if (!profile) {
    return null;
  }

  const [userInfo, setUserInfo] = useState({
    name: profile.name || "",
    position: profile.position || "",
    workingAt: profile.workingAt || "",
    github: profile.github || "",
    linkedin: profile.linkedin || "",
    email: profile.email || "",
  });

  const [about, setAbout] = useState(profile.about || "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    if (user) {
      dispatch(
        updateUser({
          user: {
            ...profile,
            name: userInfo.name,
            about,
            position: userInfo.position,
            workingAt: userInfo.workingAt,
            github: userInfo.github,
            linkedin: userInfo.linkedin,
            email: userInfo.email,
          },
        })
      );
    }
  };

  return (
    <Box>
      <Flex
        justify={user && user.role === "admin" ? "space-between" : "flex-end"}
        align="center"
      >
        {user && user.role === "admin" && (
          <CopyButton
            copyValue={profile._id}
            displayValue={`ID: ${profile._id}`}
            textColor="gray"
          />
        )}
        <Group position="right">
          {user && user._id === profile._id && (
            <>
              <Button
                size="xs"
                color={isEditing ? "gray" : "yellow"}
                onClick={() => setIsEditing((state) => !state)}
                compact
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditing && (
                <Button size="xs" compact onClick={handleSubmit}>
                  Save
                </Button>
              )}
            </>
          )}
          {user && user._id !== profile._id && (
            <>
              <Button
                size="xs"
                color="red"
                compact
                onClick={() => setOpenReportModal((state) => !state)}
              >
                Report
              </Button>
              <ReportModal
                reportedObjectType="User"
                reportedObjectId={profile._id}
                opened={openReportModal}
                setOpened={setOpenReportModal}
              />
            </>
          )}
        </Group>
      </Flex>
      {isEditing ? (
        <>
          <SimpleGrid
            breakpoints={[
              { minWidth: "xs", cols: 1 },
              { minWidth: "sm", cols: 2 },
              { minWidth: "md", cols: 3 },
            ]}
          >
            <TextInput
              placeholder="E.g, John Doe"
              description="Enter your name"
              label="Name"
              name="name"
              radius="md"
              size="xs"
              value={userInfo.name}
              onChange={handleChange}
            />
            <TextInput
              placeholder="E.g., Software Engineer"
              description="Enter your position"
              label="Position"
              name="position"
              radius="md"
              size="xs"
              value={userInfo.position}
              onChange={handleChange}
            />
            <TextInput
              placeholder="E.g., Microsoft"
              description="Enter where you work"
              label="Working At"
              name="workingAt"
              radius="md"
              size="xs"
              value={userInfo.workingAt}
              onChange={handleChange}
            />
          </SimpleGrid>
          <Box my={32}>
            <Text size={12} weight={500}>
              About me
            </Text>
            <RichTextEditor
              content={about}
              setContent={setAbout}
              status={status}
              limit={1000}
            />
          </Box>
          <SimpleGrid
            breakpoints={[
              { minWidth: "xs", cols: 1 },
              { minWidth: "sm", cols: 2 },
              { minWidth: "md", cols: 3 },
            ]}
          >
            <TextInput
              placeholder="YourEmail@domain.com"
              description="Enter your email address"
              label="Email Address"
              name="email"
              radius="md"
              size="xs"
              value={userInfo.email}
              onChange={handleChange}
            />
            <TextInput
              placeholder="https://github.com/{USERNAME}"
              description="Enter only the username"
              label="Github"
              name="github"
              radius="md"
              size="xs"
              value={userInfo.github}
              onChange={handleChange}
            />
            <TextInput
              placeholder="www.linkedin.com/in/{PROFILE_ADDRESS}"
              description="Enter only the profile address"
              label="LinkedIn"
              name="linkedin"
              radius="md"
              size="xs"
              value={userInfo.linkedin}
              onChange={handleChange}
            />
          </SimpleGrid>
        </>
      ) : (
        <>
          <Flex
            direction="column"
            align="center"
            justify="center"
            mt={16}
            p={8}
          >
            <Text weight={500} size={20}>
              {profile.name || profile.username}
            </Text>
            <Text size={12}>
              {profile.position}{" "}
              {profile.workingAt && `at ${profile.workingAt}`}
            </Text>
          </Flex>
          <Flex justify="center" align="center" mt={32} mb={64} p={8}>
            {profile.about ? (
              <RichTextContent>{profile.about}</RichTextContent>
            ) : (
              <Text size={14}>
                This user has not added any information about themselves yet.
              </Text>
            )}
          </Flex>
          <Box>
            <SimpleGrid cols={3} spacing={16}>
              {profile.email && (
                <Anchor href={`mailto:${profile.email}`}>
                  <Paper shadow="xs" p={8} className={classes.linkPaper}>
                    <ThemeIcon variant="light" mb={8}>
                      <IconMail />
                    </ThemeIcon>
                    <Text size={14}>Send me an email</Text>
                  </Paper>
                </Anchor>
              )}

              {profile.github && (
                <Anchor
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                >
                  <Paper shadow="xs" p={8} className={classes.linkPaper}>
                    <ThemeIcon variant="light" mb={8}>
                      <IconBrandGithub />
                    </ThemeIcon>
                    <Text size={14}>Check out my projects</Text>
                  </Paper>
                </Anchor>
              )}

              {profile.linkedin && (
                <Anchor
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                >
                  <Paper shadow="xs" p={8} className={classes.linkPaper}>
                    <ThemeIcon variant="light" mb={8}>
                      <IconBrandLinkedin />
                    </ThemeIcon>
                    <Text size={14}>Connect with me on LinkedIn</Text>
                  </Paper>
                </Anchor>
              )}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Box>
  );
};
