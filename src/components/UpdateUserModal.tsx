import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  NativeSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateSubcategory } from "../features/subcategory/subcategoryThunks";
import { updateUser } from "../features/user/userThunks";
import { ActionTypes, IModalActions } from "../reducers/modalReducer";
import { RootState, useAppDispatch } from "../store";
import { IPopulatedSubcategory } from "../types/subcategory.types";
import { IUser } from "../types/user.types";
import { RichTextEditor } from "./RichTextEditor";

interface IProps {
  user: IUser;
  opened: boolean;
  setOpened: React.Dispatch<IModalActions>;
}

export const UpdateUserModal = ({ user, opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: user.name || "",
    position: user.position || "",
    workingAt: user.workingAt || "",
    email: user.email || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
  });
  const [about, setAbout] = useState(user.about || "");

  const handleSubmit = async () => {
    await dispatch(
      updateUser({
        user: {
          ...user,
          name: userInfo.name,
          position: userInfo.position,
          workingAt: userInfo.workingAt,
          email: userInfo.email,
          github: userInfo.github,
          linkedin: userInfo.linkedin,
          about,
        },
      })
    );
    setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={() =>
        setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
      }
      title="Update User Information"
      size="lg"
      centered
    >
      <TextInput label="ID" size="xs" value={user._id} readOnly disabled />

      <TextInput
        label="Username"
        size="xs"
        value={user.username}
        readOnly
        disabled
      />

      <TextInput
        placeholder="E.g, John Doe"
        description="Enter your name"
        label="Name"
        name="name"
        size="xs"
        value={userInfo.name}
        onChange={handleChange}
      />
      <TextInput
        placeholder="E.g., Software Engineer"
        description="Enter your position"
        label="Position"
        name="position"
        size="xs"
        value={userInfo.position}
        onChange={handleChange}
      />
      <TextInput
        placeholder="E.g., Microsoft"
        description="Enter where you work"
        label="Working At"
        name="workingAt"
        size="xs"
        value={userInfo.workingAt}
        onChange={handleChange}
      />

      <TextInput
        placeholder="YourEmail@domain.com"
        description="Enter your email address"
        label="Email Address"
        name="email"
        radius="md"
        size="xs"
        value={userInfo.email}
        onChange={handleChange}
      />
      <TextInput
        placeholder="https://github.com/{USERNAME}"
        description="Enter only the username"
        label="Github"
        name="github"
        radius="md"
        size="xs"
        value={userInfo.github}
        onChange={handleChange}
      />
      <TextInput
        placeholder="www.linkedin.com/in/{PROFILE_ADDRESS}"
        description="Enter only the profile address"
        label="LinkedIn"
        name="linkedin"
        radius="md"
        size="xs"
        value={userInfo.linkedin}
        onChange={handleChange}
      />

      <Box my={32}>
        <Text size={12} weight={500}>
          About me
        </Text>
        <RichTextEditor
          content={about}
          setContent={setAbout}
          status={status}
          limit={1000}
        />
      </Box>

      <Group position="right" mt={16}>
        <Button
          size="xs"
          color="gray"
          onClick={() =>
            setOpened({ type: ActionTypes.HANDLE_EDIT_MODAL, payload: false })
          }
          disabled={status === "pending"}
        >
          Cancel
        </Button>
        <Button size="xs" onClick={handleSubmit} loading={status === "pending"}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};
