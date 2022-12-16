import { Box, createStyles, Loader } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

interface IProps {
  variant?: "bars" | "dots";
}

const LoaderComponent = ({ variant }: IProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.loader}>
      {variant ? <Loader variant={variant} /> : <Loader />}
    </Box>
  );
};

export { LoaderComponent as Loader };
