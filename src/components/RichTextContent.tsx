import { TypographyStylesProvider } from "@mantine/core";

interface IProps {
  children: string;
}

export const RichTextContent = ({ children }: IProps) => {
  return (
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: `${children}` }} />
    </TypographyStylesProvider>
  );
};
