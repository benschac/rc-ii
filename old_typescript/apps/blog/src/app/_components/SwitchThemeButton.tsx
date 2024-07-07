"use client";
import { useState } from "react";

import { Button, useIsomorphicLayoutEffect } from "tamagui";

import {
  useThemeSetting,
  useRootTheme,
  type ColorScheme,
} from "@tamagui/next-theme";
import React from "react";
export const SwitchThemeButton = () => {
  const themeSetting = useThemeSetting();

  const [theme] = useRootTheme();
  // TODO: use system theme as default
  const [clientTheme, setClientTheme] = useState<ColorScheme | "system">(
    "light"
  );
  useIsomorphicLayoutEffect(() => {
    setClientTheme(
      (themeSetting.forcedTheme as ColorScheme) ||
        (themeSetting.current as ColorScheme) ||
        theme
    );
  }, [themeSetting.current, themeSetting.resolvedTheme]);

  const emoji = React.useMemo(() => {
    switch (clientTheme) {
      case "dark":
        return "🌚";
      case "light":
        return "🌞";
      case "system":
        return "🌗";
      default:
        break;
    }
  }, [clientTheme]);

  return (
    <Button chromeless onPress={themeSetting.toggle}>
      {emoji}
    </Button>
  );
};
