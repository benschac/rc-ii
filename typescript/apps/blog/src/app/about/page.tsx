"use client";
import { H1, Spacer, XStack, YStack, Text } from "tamagui";
import { SwitchThemeButton } from "../_components/SwitchThemeButton";
import { Link } from "../_components/Link";

export default function Page() {
  return (
    <YStack f={1} px="$4">
      <YStack tag="header">
        <XStack tag="nav">
          <H1>about</H1>
          <Spacer />
          <Link href="/about">About</Link>
          {/* TODO: add mdx content */}
          <SwitchThemeButton />
        </XStack>
      </YStack>
    </YStack>
  );
}
