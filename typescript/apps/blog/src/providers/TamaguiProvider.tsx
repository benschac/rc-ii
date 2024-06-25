"use client";

import "@tamagui/font-inter/css/400.css";
import "@tamagui/font-inter/css/700.css";
import "@tamagui/core/reset.css";
import "@tamagui/polyfill-dev";

import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useServerInsertedHTML } from "next/navigation";
import {
  type ColorScheme,
  NextThemeProvider,
  useRootTheme,
} from "@tamagui/next-theme";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../../tamagui.config";

export const NextTamaguiProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useRootTheme();

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet();

    return (
      <>
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          id={rnwStyle.id}
        />
        <style jsx global>{`
          html {
            font-family: "Inter";
          }
        `}</style>

        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            // avoid flash of entered elements before enter animations run:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />

        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            // the first time this runs you'll get the full CSS including all themes
            // after that, it will only return CSS generated since the last call
            __html: tamaguiConfig.getNewCSS({
              exclude:
                process.env.NODE_ENV === "production" ? "design-system" : null,
            }),
          }}
        />
      </>
    );
  });
  return (
    <NextThemeProvider
      skipNextHead
      onChangeTheme={(theme) => {
        setTheme(theme as ColorScheme);
      }}
    >
      <TamaguiProvider
        defaultTheme={theme}
        config={tamaguiConfig}
        disableRootThemeClass
      >
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
};
