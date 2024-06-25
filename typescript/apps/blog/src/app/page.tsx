"use client";
import { H1, Spacer, XStack, YStack, Text } from "tamagui";
import { SwitchThemeButton } from "./_components/SwitchThemeButton";
import { Link } from "./_components/Link";

export default function Home() {
  return (
    <YStack f={1} px="$4">
      <YStack tag="header">
        <XStack tag="nav">
          <H1>bensch.ac</H1>
          <Spacer />
          <Link href="/about">About</Link>
          <SwitchThemeButton />
        </XStack>
      </YStack>
      {/* <SwitchThemeButton /> */}
    </YStack>
  );
}
