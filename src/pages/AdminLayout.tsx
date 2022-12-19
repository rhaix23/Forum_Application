import { useState } from "react";
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { AdminNavbar } from "../components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IUser } from "../types/user.types";

export const AdminLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) return null;

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AdminNavbar opened={opened} user={user} />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text size={20} color="blue.5" weight={700}>
              Admin Dashboard
            </Text>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};
