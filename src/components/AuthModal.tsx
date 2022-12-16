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
import { login } from "../features/user/userThunks";
import { useAppDispatch } from "../store";

interface IProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ opened, setOpened }: IProps) => {
  const dispatch = useAppDispatch();
  const [isNewUser, setIsNewUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNewUser) {
      // dispatch(register(userInfo));
    } else {
      dispatch(
        login({ username: userInfo.username, password: userInfo.password })
      );
    }

    setOpened(false);
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
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
        <Button type="submit" size="xs" fullWidth mb={16}>
          {isNewUser ? "Sign Up" : "Sign In"}
        </Button>
        <Flex justify="center" align="center" direction="column">
          <Text mb={8}>
            {isNewUser ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <Button
            fullWidth
            variant="outline"
            size="xs"
            onClick={() => setIsNewUser((state) => !state)}
          >
            {isNewUser ? "Sign In" : "Create a new account"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export { AuthModal };
