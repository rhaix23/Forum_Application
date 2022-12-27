import { ActionIcon, createStyles, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IComment } from "../types/comment.types";
import { ConfirmationModal } from "./ConfirmationModal";
import dayjs from "dayjs";
import { UpdateCommentModal } from "./UpdateCommentModal";
import { ViewCommentModal } from "./ViewCommentModal";
import { useAppDispatch } from "../store";
import { deleteComment } from "../features/comment/commentThunks";

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
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <ViewCommentModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        comment={comment}
      />
      <UpdateCommentModal
        opened={openEditModal}
        setOpened={setOpenEditModal}
        comment={comment}
      />
      <ConfirmationModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        handleClick={() =>
          dispatch(
            deleteComment({
              commentId: comment._id,
            })
          )
        }
      />
      <tr>
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
          <Text>{dayjs(comment.createdAt).format("MM/DD/YYYY")}</Text>
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
                  onClick={() => setOpenViewModal(true)}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  color="yellow"
                  icon={<IconPencil size={16} />}
                  onClick={() => setOpenEditModal(true)}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={16} />}
                  onClick={() => setOpenDeleteModal(true)}
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