/**
 * 1. On hover, get text to
 *   - transition 2 additional text elements, with the same logo text
 *   - each one is a different color
 */
import { getSize, getSpace } from "@tamagui/get-token";

import {
  type GetProps,
  type SizeTokens,
  View,
  Text,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from "@tamagui/web";

import { cloneElement, useContext } from "react";
export const LogoContext = createStyledContext({
  size: "$md" as SizeTokens,
});
export const LogoFrame = styled(View, {
  name: "Button",
  context: LogoContext,
  backgroundColor: "$background",
  alignItems: "center",
  flexDirection: "row",
  hoverStyle: {
    backgroundColor: "$backgroundHover",
  },
  pressStyle: {
    backgroundColor: "$backgroundPress",
  },
  variants: {
    size: {
      "...size": (name, { tokens }) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name],
          // note the getSpace and getSize helpers will let you shift down/up token sizes
          // whereas with gap we just multiply by 0.2
          // this is a stylistic choice, and depends on your design system values
          gap: tokens.space[name].val * 0.2,
          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        };
      },
    },
  } as const,
  defaultVariants: {
    size: "$md",
  },
});
export type LogoProps = GetProps<typeof LogoFrame>;
export const LogoText = styled(Text, {
  name: "LogoText",
  context: LogoContext,
  color: "$color",
  userSelect: "none",
  variants: {
    size: {
      "...fontSize": (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },
  } as const,
});

const ButtonIcon = (props: { children: React.ReactElement }) => {
  const { size } = useContext(LogoContext.context);
  const smaller = getSize(size, {
    shift: -2,
  });
  const theme = useTheme();

  return cloneElement(props.children, {
    size: smaller.val * 0.5,
    color: theme.color.get(),
  });
};
export const Logo = withStaticProperties(LogoFrame, {
  Props: LogoContext.Provider,
  Text: LogoText,
  Icon: ButtonIcon,
});
