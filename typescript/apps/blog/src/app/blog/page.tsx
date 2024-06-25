import React from "react";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./content";

type Params = {
  params: {
    slug: string;
  };
};

// export function generateMetadata({ params }: Params): Metadata {
// const post = getPostBySlug(params.slug);

// if (!post) {
//   return notFound();
// }

// const title = `${post.title}`;

//   return {
//     title,
//     openGraph: {
//       title,
//       images: [post.ogImage.url],
//     },
//   };
// }

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page() {
  const posts = getAllPosts();
  return <Content posts={posts} />;
}
