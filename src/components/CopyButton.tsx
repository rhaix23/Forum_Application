import { CopyButton, Text } from "@mantine/core";

interface IProps {
  copyValue: string;
  displayValue: string;
  displayValueOnCopy?: string;
  size?: number;
  textColor?: string;
}

const CopyButtonComponent = ({
  copyValue,
  displayValue,
  displayValueOnCopy = "Copied ID",
  size = 12,
  textColor = "#C1C2C5",
}: IProps) => {
  return (
    <CopyButton value={copyValue} timeout={2000}>
      {({ copied, copy }) => (
        <Text
          color={copied ? "teal" : textColor}
          onClick={copy}
          sx={{ cursor: "pointer" }}
          size={size}
        >
          {copied ? displayValueOnCopy : displayValue}
        </Text>
      )}
    </CopyButton>
  );
};

export { CopyButtonComponent as CopyButton };
