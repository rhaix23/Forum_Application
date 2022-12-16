import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  Header,
  Menu,
  Text,
  Title,
} from "@mantine/core";
import { IconHome, IconLogin, IconMenu2, IconUser } from "@tabler/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ThemeColorToggle } from "../components";
import { logout } from "../features/user/userThunks";
import { AppDispatch, RootState } from "../store";
import { links } from "../utils/links";
import { AuthModal } from "./AuthModal";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem",
    position: "fixed",
    maxWidth: "960px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  links: {
    "@media (max-width: 550px)": {
      display: "none",
    },
  },
  burger: {
    display: "block",
    "@media (min-width: 550px)": {
      display: "none",
    },
  },
  dropdown: {
    display: "block",
    "@media (min-width: 550px)": {
      display: "none",
    },
  },
}));

const HeaderComponent = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.user);
  const [opened, setOpened] = useState(false);

  const renderLinks = links.map((link, index) => {
    if (link.text === "Profile" && !user) return null;
    return (
      <Button
        key={index}
        size="xs"
        variant={location.pathname === `${link.link}` ? "outline" : "subtle"}
        component={Link}
        to={link.link}
      >
        {link.text}
      </Button>
    );
  });

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <Header className={classes.header} height={60}>
      <Box component={Link} to="/">
        <Title size={20} color="blue.5">
          Programmer's Hub
        </Title>
        <Text size={12}>A community for programmers.</Text>
      </Box>
      <Group className={classes.links}>
        {renderLinks}
        {user ? (
          <Button size="xs" variant="subtle" onClick={handleLogout}>
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => setOpened(true)} size="xs" variant="subtle">
            Sign In
          </Button>
        )}

        <ThemeColorToggle />
      </Group>

      <Menu shadow="md" width={200} position="bottom-end" offset={20} withArrow>
        <Menu.Target>
          <ActionIcon className={classes.burger} size="sm">
            <IconMenu2 />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className={classes.dropdown}>
          <Menu.Item icon={<IconHome size={14} />} component={Link} to="/">
            Home
          </Menu.Item>
          {user && (
            <Menu.Item
              icon={<IconUser size={14} />}
              component={Link}
              to="/profile"
            >
              Profile
            </Menu.Item>
          )}
          <Menu.Item icon={<IconLogin size={14} />}>Sign In</Menu.Item>
          <Menu.Item>
            <ThemeColorToggle />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <AuthModal opened={opened} setOpened={setOpened} />
    </Header>
  );
};

export { HeaderComponent as Header };
