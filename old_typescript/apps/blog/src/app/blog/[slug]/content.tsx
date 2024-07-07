"use client";

import type { Post } from "@/interfaces/post";
import { YStack, Text, H1 } from "tamagui";

export function Content({ post, content }: { post: Post; content: string }) {
  return (
    <YStack f={1}>
      <H1>{post.title}</H1>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <YStack tag="div" dangerouslySetInnerHTML={{ __html: content }} />
    </YStack>
  );
}
