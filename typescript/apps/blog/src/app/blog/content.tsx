"use client";
import type { Post } from "@/interfaces/post";
import { YStack, H1 } from "tamagui";
import { Link } from "../_components/Link";

export function Content({ posts }: { posts: Post[] }) {
  return (
    <YStack f={1}>
      <H1>Posts</H1>
      {posts.map((post) => (
        <YStack key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </YStack>
      ))}
    </YStack>
  );
}
