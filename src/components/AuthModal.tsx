import {
  Box,
  Button,
  Flex,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { Dispatch, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { login, register } from "../features/user/userThunks";
import { RootState, useAppDispatch } from "../store";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.user);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNewUser) {
      await dispatch(register(userInfo));
    } else {
      await dispatch(
        login({ username: userInfo.username, password: userInfo.password })
      );
    }

    setUserInfo({ username: "", password: "", confirmPassword: "" });
    setOpened(false);
    setIsNewUser(false);
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        status === "pending" ? null : setOpened(false);
      }}
      title={isNewUser ? "Create a new account" : "Sign In"}
    >
      <form onSubmit={handleLogin}>
        <Box mb={16}>
          <TextInput
            mb={8}
            placeholder="Your Username"
            label="Username"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            withAsterisk
          />
          <PasswordInput
            mb={8}
            placeholder="Your pasword"
            label="Password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            withAsterisk
          />
          {isNewUser && (
            <PasswordInput
              mb={8}
              placeholder="Confirm your pasword"
              label="Confirm Password"
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={handleInputChange}
              withAsterisk
            />
          )}
        </Box>
        <Button
          type="submit"
          size="xs"
          fullWidth
          mb={32}
          loading={status === "pending"}
        >
          {isNewUser ? "Sign Up" : "Sign In"}
        </Button>
        <Flex justify="center" align="center" direction="column">
          <Text mb={8} size={12}>
            {isNewUser ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <Button
            fullWidth
            variant="outline"
            size="xs"
            onClick={() => setIsNewUser((state) => !state)}
            disabled={status === "pending"}
          >
            {isNewUser ? "Sign In" : "Create a new account"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export { AuthModal };
