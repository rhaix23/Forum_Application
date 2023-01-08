import { CopyButton, Text } from "@mantine/core";

interface IProps {
  copyValue: string;
  displayValue: string;
  displayValueOnCopy?: string;
}

const CopyButtonComponent = ({
  copyValue,
  displayValue,
  displayValueOnCopy = "Copied ID",
}: IProps) => {
  return (
    <CopyButton value={copyValue} timeout={2000}>
      {({ copied, copy }) => (
        <Text
          color={copied ? "teal" : "#C1C2C5"}
          onClick={copy}
          sx={{ cursor: "pointer" }}
        >
          {copied ? displayValueOnCopy : displayValue}
        </Text>
      )}
    </CopyButton>
  );
};

export { CopyButtonComponent as CopyButton };
