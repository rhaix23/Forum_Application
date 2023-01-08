import { ActionIcon, createStyles, Flex, Menu, Text } from "@mantine/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IAdminPagePost, IPost } from "../types/post.types";
import { ConfirmationModal } from "./ConfirmationModal";
import { UpdatePostModal } from "./UpdatePostModal";
import { ViewPostModal } from "./ViewPostModal";
import { useAppDispatch } from "../store";
import { deletePost } from "../features/post/postThunks";
import dayjs from "dayjs";
import { CopyButton } from "./CopyButton";

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
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost({ id: post._id }));
    setOpenDeleteModal(false);
  };

  return (
    <>
      <ViewPostModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        post={post}
      />
      <UpdatePostModal
        opened={openEditModal}
        setOpened={setOpenEditModal}
        post={post}
      />
      <ConfirmationModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        handleClick={handleDelete}
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
