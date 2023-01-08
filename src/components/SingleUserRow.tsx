import {
  ActionIcon,
  Button,
  createStyles,
  Flex,
  Menu,
  Text,
} from "@mantine/core";
import { useReducer, useState } from "react";
import { IUser } from "../types/user.types";
import { ConfirmationModal } from "./ConfirmationModal";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { updateAccountStatus } from "../features/user/userThunks";
import { CopyButton } from "./CopyButton";
import {
  IconBan,
  IconDots,
  IconEye,
  IconLock,
  IconLockOpen,
  IconPencil,
} from "@tabler/icons";
import {
  ActionTypes,
  modalReducer,
  modalState,
} from "../reducers/modalReducer";
import { ViewUserModal } from "./ViewUserModal";
import { UpdateUserModal } from "./UpdateUserModal";

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
  const [modal, setModal] = useReducer(modalReducer, modalState);

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
      <ViewUserModal
        user={user}
        opened={modal.viewModalIsOpened}
        setOpened={setModal}
      />
      <UpdateUserModal
        user={user}
        opened={modal.editModalIsOpened}
        setOpened={setModal}
      />
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
          <CopyButton copyValue={user._id} displayValue={user._id} />
        </td>
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
        <td>
          <Flex justify="center" align="center">
            <Menu shadow="md">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  color="blue"
                  icon={<IconEye size={16} />}
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_VIEW_MODAL,
                      payload: true,
                    })
                  }
                  // onClick={() => setOpenViewModal(true)}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  color="yellow"
                  icon={<IconPencil size={16} />}
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_EDIT_MODAL,
                      payload: true,
                    })
                  }
                >
                  Edit
                </Menu.Item>

                <Menu.Item
                  color="red"
                  icon={
                    user.isDisabled ? (
                      <IconLockOpen size={16} />
                    ) : (
                      <IconLock size={16} />
                    )
                  }
                  onClick={() => setOpenModal(true)}
                >
                  {user.isDisabled ? "Activate" : "Disable"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </td>
      </tr>
    </>
  );
};
