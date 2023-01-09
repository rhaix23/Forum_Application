import { useState } from "react";
import { createStyles, Navbar, Text } from "@mantine/core";
import {
  IconLogout,
  IconCategory,
  IconInbox,
  IconCategory2,
  IconMessageCircle,
  IconUsers,
  IconBoxMultiple,
  IconSelector,
  IconExclamationCircle,
} from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import { UserButton } from "./UserButton";
import { IUser } from "../types/user.types";
import { logout } from "../features/user/userThunks";
import { useAppDispatch } from "../store";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    section: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      marginBottom: theme.spacing.md,

      "&:not(:last-of-type)": {
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
        }`,
      },
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "/admin", label: "Categories", icon: IconCategory },
  { link: "/admin/subcategory", label: "Subcategories", icon: IconCategory2 },
  { link: "/admin/posts", label: "Posts", icon: IconInbox },
  { link: "/admin/comments", label: "Comments", icon: IconMessageCircle },
  { link: "/admin/users", label: "Users", icon: IconUsers },
  { link: "/admin/reports", label: "Reports", icon: IconExclamationCircle },
];

interface IProps {
  opened: boolean;
  user: IUser;
}

export const AdminNavbar = ({ opened, user }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Categories");

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const links = data.map((item) => (
    <Text
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      component={Link}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Text>
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section className={classes.section}>
        <UserButton
          name={user.username}
          role={user.role}
          icon={<IconSelector size={14} stroke={1.5} />}
        />
      </Navbar.Section>

      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Text component={Link} to="/" className={classes.link}>
          <IconBoxMultiple className={classes.linkIcon} stroke={1.5} />
          <span>Go to website</span>
        </Text>

        <Text
          className={classes.link}
          onClick={handleLogout}
          sx={{ cursor: "pointer" }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Text>
      </Navbar.Section>
    </Navbar>
  );
};
