"use client";
import type { Post } from "@/interfaces/post";
import { H1, Spacer, XStack, YStack, Text } from "tamagui";
import { SwitchThemeButton } from "./SwitchThemeButton";
import { Link } from "./Link";
import Script from "next/script";

const Header = () => {
  return (
    <YStack>
      <YStack tag="header">
        <XStack columnGap="$4" ai="center" tag="nav">
          <H1>bensch.ac</H1>
          <Spacer flex />
          <Link href="/about">about</Link>
          <Link href="/blog">blog</Link>
          <Link href="/uses">uses</Link>
          <SwitchThemeButton />
        </XStack>
      </YStack>
    </YStack>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack f={1} px="$4">
      <Header />
      {children}
      <Script
        async
        defer
        src="https://www.recurse-scout.com/loader.js?t=52b00143745a218ef86c10cc5dc24f55"
      />
    </YStack>
  );
};
