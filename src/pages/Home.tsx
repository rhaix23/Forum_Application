import { Box, createStyles, Group, Paper, Text } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { fetchCategories } from "../features/category/categoryThunks";
import { AppDispatch, RootState } from "../store";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem",
  },

  category: {
    backgroundColor: theme.colors.blue[7],
    padding: ".5rem 1rem",
  },

  subcategory: {
    "&:hover": {
      borderColor: theme.colors.blue[7],
      transform: "scale(1.01)",
    },
  },
}));

const Home = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (status === "pending") {
    return <Loader variant="dots" />;
  } else if (status === "rejected") {
    return <Text>Something went wrong. Refresh the page.</Text>;
  }

  const renderCategories = (
    <Paper mb={64} shadow="xs" withBorder>
      {status === "resolved" &&
        categories.map((category) => {
          return (
            <Box key={category._id}>
              <Paper className={classes.category} withBorder shadow="xs">
                <Text weight="bold" color="white">
                  {category.name}
                </Text>
              </Paper>
              {category.subcategories.map((subcategory) => (
                <Paper
                  key={subcategory._id}
                  className={classes.subcategory}
                  sx={{ padding: "1.5rem 2rem" }}
                  withBorder
                  shadow="xs"
                  component={Link}
                  to={`/${subcategory._id}`}
                >
                  <Group>
                    <Text color="blue.7">{subcategory.name}</Text>
                  </Group>
                  <Text size={13} color="gray.6">
                    {subcategory.description}
                  </Text>
                </Paper>
              ))}
            </Box>
          );
        })}
    </Paper>
  );

  return <Box>{renderCategories}</Box>;
};

export { Home };
