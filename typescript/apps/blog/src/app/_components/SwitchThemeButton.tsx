import { useState } from "react";

import { Button, useIsomorphicLayoutEffect } from "tamagui";

import {
  useThemeSetting,
  useRootTheme,
  type ColorScheme,
} from "@tamagui/next-theme";
export const SwitchThemeButton = () => {
  const themeSetting = useThemeSetting();

  const [theme] = useRootTheme();
  // TODO: use system theme as default
  const [clientTheme, setClientTheme] = useState<ColorScheme | "system">(
    "system"
  );
  useIsomorphicLayoutEffect(() => {
    setClientTheme(
      (themeSetting.forcedTheme as ColorScheme) ||
        (themeSetting.current as ColorScheme) ||
        theme
    );
  }, [themeSetting.current, themeSetting.resolvedTheme]);

  return (
    <Button onPress={themeSetting.toggle}>Change theme: {clientTheme}</Button>
  );
};
