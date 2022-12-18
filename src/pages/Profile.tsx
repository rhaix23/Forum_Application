import { createStyles, Paper, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ProfileMenuAccount,
  ProfileMenuComments,
  ProfileMenuPosts,
  ProfileMenuUserAccount,
} from "../components";
import { Loader } from "../components/Loader";
import { getSingleUser } from "../features/user/userThunks";
import { RootState, useAppDispatch } from "../store";

const useStyles = createStyles((theme) => ({
  linkPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  linkPaperDisabled: {
    backgroundColor: theme.colors.gray[1],
    cursor: "not-allowed",
  },
  linkPaperActive: {
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.colors.blue[9],
    },
  },
}));

const Profile = () => {
  const dispatch = useAppDispatch();
  const { classes, cx } = useStyles();
  const { id } = useParams();
  const { user, profile, status } = useSelector(
    (state: RootState) => state.user
  );
  const [activeTab, setActiveTab] = useState<string | null>("profile");

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser({ userId: id }));
    }
  }, [id]);

  if (status === "pending") {
    return <Loader />;
  }

  if (!profile) {
    return null;
  }

  return (
    <Paper shadow="xs" p={16} withBorder>
      <Tabs keepMounted={false} value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="profile">User Profile</Tabs.Tab>
          <Tabs.Tab value="posts">Posts</Tabs.Tab>
          <Tabs.Tab value="comments">Comments</Tabs.Tab>
          {user && user._id === profile._id && (
            <Tabs.Tab value="account">Account</Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xs">
          <ProfileMenuUserAccount />
        </Tabs.Panel>

        <Tabs.Panel value="posts" pt="xs">
          <ProfileMenuPosts />
        </Tabs.Panel>

        <Tabs.Panel value="comments" pt="xs">
          <ProfileMenuComments />
        </Tabs.Panel>

        <Tabs.Panel value="account" pt="xs">
          <ProfileMenuAccount />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export { Profile };
