import { Paragraph, styled } from "tamagui";

export const LI = styled(Paragraph, {
  // biome-ignore lint/suspicious/noExplicitAny: TODO: update the type in tamagui
  display: "list-item" as any,
  tag: "li",
  size: "$5",
  pb: "$1",
});
