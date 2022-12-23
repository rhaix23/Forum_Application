import {
  ActionIcon,
  Button,
  createStyles,
  Flex,
  Menu,
  Text,
} from "@mantine/core";
import { IconBan, IconDots, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { IUser } from "../types/user.types";
import { ConfirmationModal } from "./ConfirmationModal";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { updateAccountStatus, updateUser } from "../features/user/userThunks";

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colors.blue[7],
    ":hover": {
      color: theme.colors.blue[9],
      textDecoration: "underline",
    },
  },
}));

interface IProps {
  user: IUser;
}

export const SingleUserRow = ({ user }: IProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    if (user) {
      dispatch(
        updateAccountStatus({
          userId: user._id,
        })
      );
    }
    setOpenModal(false);
  };

  return (
    <>
      <ConfirmationModal
        opened={openModal}
        setOpened={setOpenModal}
        text={
          user.isDisabled
            ? "Activate this user's account and allow them to log in"
            : "Disable this user's account and prevent them from logging in"
        }
        confirmationText={user.isDisabled ? "Activate" : "Disable"}
        confirmationColor={user.isDisabled ? "blue" : "red"}
        handleClick={handleClick}
      />
      <tr>
        <td>
          <Text
            component={Link}
            to={`/profile/${user._id}`}
            className={classes.link}
          >
            {user.username}
          </Text>
        </td>
        <td>{user.role}</td>
        <td>{String(user.isDisabled)}</td>
        <td>{dayjs(user.createdAt).format("MM/DD/YYYY")}</td>
        <td>
          <Flex justify="center" align="center">
            <Button
              size="xs"
              color={user.isDisabled ? "blue" : "red"}
              compact
              onClick={() => setOpenModal(true)}
            >
              {user.isDisabled ? "Activate" : "Disable"}
            </Button>
          </Flex>
        </td>
      </tr>
    </>
  );
};
