import { ActionIcon, createStyles, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { IComment } from "../types/comment.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { UpdateCommentModal } from "./UpdateCommentModal";
import { ViewCommentModal } from "./ViewCommentModal";
import { useAppDispatch } from "../store";
import { deleteComment } from "../features/comment/commentThunks";
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
  comment: IComment;
}

export const SingleCommentRow = ({ comment }: IProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [modal, setModal] = useReducer(modalReducer, modalState);

  return (
    <>
      <ViewCommentModal
        opened={modal.viewModalIsOpened}
        setOpened={setModal}
        comment={comment}
      />
      <UpdateCommentModal
        opened={modal.editModalIsOpened}
        setOpened={setModal}
        comment={comment}
      />
      <ConfirmationModal
        opened={modal.deleteModalIsOpened}
        setOpened={setModal}
        handleClick={async () => {
          await dispatch(
            deleteComment({
              commentId: comment._id,
            })
          );
          setModal({ type: ActionTypes.HANDLE_DELETE_MODAL, payload: false });
        }}
      />
      <tr>
        <td>
          <CopyButton copyValue={comment._id} displayValue={comment._id} />
        </td>
        <td>
          <Text
            component={Link}
            to={`/profile/${comment.user._id}`}
            className={classes.link}
          >
            {comment.user.username}
          </Text>
        </td>
        <td>
          <Text
            component={Link}
            to={`/post/${comment.post._id}`}
            className={classes.link}
          >
            {comment.post.title}
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
