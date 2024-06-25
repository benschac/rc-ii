import { useRouter } from "next/navigation";
import type { LinkProps } from "next/link";
import type { GestureReponderEvent } from "@tamagui/core";
import { Text } from "tamagui";

export const Link = ({
  href,
  replace,
  ...props
}: LinkProps & { children: React.ReactNode }) => {
  const router = useRouter();
  const handlePress = (e: GestureReponderEvent) => {
    e.preventDefault();
    router.push(href.toString());
  };

  return (
    <Text
      tag="a"
      href={href.toString()}
      onPress={handlePress}
      cursor="pointer"
      color="inherit"
      // @ts-expect-error
      lineHeight="inherit"
      {...props}
    />
  );
};
