import { Flex, Image, Text } from "@mantine/core";
import sadfaceImage from "../assets/sadface.png";

interface IProps {
  image?: string;
  text?: string;
}

export const ImageWithTextAlert = ({
  image,
  text = "Something went wrong! Please refresh the page or try again later",
}: IProps) => {
  return (
    <Flex direction="column" justify="center" align="center">
      <div style={{ width: 400, marginLeft: "auto", marginRight: "auto" }}>
        <Image src={image ? image : sadfaceImage} radius="md" />
      </div>
      <Text size={20}>{text}</Text>
    </Flex>
  );
};
