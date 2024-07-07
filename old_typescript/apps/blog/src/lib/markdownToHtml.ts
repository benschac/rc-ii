import { remark } from "remark";
import html from "remark-html";
import remarkParse from "remark-parse";
import rehypeHighlight from "rehype-highlight";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkParse)
    .use(rehypeHighlight)
    .use(html)
    .process(markdown);
  return result.toString();
}
