import { useRouter } from "next/navigation";
import type { LinkProps } from "next/link";
import type { GestureReponderEvent } from "@tamagui/core";
import { Text } from "tamagui";

export const Link = ({
  href,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const handlePress = (event: GestureReponderEvent) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <Text
      tag="a"
      onPress={handlePress}
      cursor="pointer"
      color="inherit"
      // @ts-expect-error
      lineHeight="inherit"
      {...props}
    />
  );
};
