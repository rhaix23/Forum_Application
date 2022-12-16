import { ActionIcon, createStyles, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  icon: {
    "@media (max-width: 550px)": {
      width: "100%",
    },
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
}));

const ThemeColorToggle = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      className={classes.icon}
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
};

export { ThemeColorToggle };
