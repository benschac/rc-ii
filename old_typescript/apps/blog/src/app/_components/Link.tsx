import { useRouter } from "next/navigation";
import type { LinkProps } from "next/link";
import type { GestureReponderEvent } from "@tamagui/core";
import { Text } from "tamagui";

export const Link = ({
  href,
  tag = "a",
  ...props
}: {
  href: string;
  children: React.ReactNode;
  tag?: string;
}) => {
  const router = useRouter();
  const handlePress = (event: GestureReponderEvent) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <Text
      background="$background"
      tag={tag}
      onPress={handlePress}
      cursor="pointer"
      color="$green"
      // @ts-expect-error
      lineHeight="inherit"
      {...props}
    />
  );
};
