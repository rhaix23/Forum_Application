import { ActionIcon, createStyles, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { IAdminPagePost, IPost } from "../types/post.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { UpdatePostModal } from "./UpdatePostModal";
import { ViewPostModal } from "./ViewPostModal";
import { useAppDispatch } from "../store";
import { deletePost } from "../features/post/postThunks";
import { CopyButton } from "./CopyButton";
import {
  ActionTypes,
  modalReducer,
  modalState,
} from "../reducers/modalReducer";

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
  post: IAdminPagePost;
}

export const SinglePostRow = ({ post }: IProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [modal, setModal] = useReducer(modalReducer, modalState);

  return (
    <>
      <ViewPostModal
        opened={modal.viewModalIsOpened}
        setOpened={setModal}
        post={post}
      />
      <UpdatePostModal
        opened={modal.editModalIsOpened}
        setOpened={setModal}
        post={post}
      />
      <ConfirmationModal
        opened={modal.deleteModalIsOpened}
        setOpened={setModal}
        handleClick={async () => {
          await dispatch(deletePost({ id: post._id }));
          setModal({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false });
        }}
      />
      <tr>
        <td>
          <CopyButton copyValue={post._id} displayValue={post._id} />
        </td>
        <td>
          <Text
            component={Link}
            to={`/post/${post._id}`}
            className={classes.link}
          >
            {post.title}
          </Text>
        </td>
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
                  icon={<IconTrash size={16} />}
                  onClick={() =>
                    setModal({
                      type: ActionTypes.HANDLE_DELETE_MODAL,
                      payload: true,
                    })
                  }
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </td>
      </tr>
    </>
  );
};
