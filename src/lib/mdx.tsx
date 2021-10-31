import fs from "fs";

import mdxPrism from "mdx-prism";
import path from "path";
import readingTime from "reading-time";

import { IPosts } from "../types/custom-types";
import MDXComponents from "../components/MDXComponents";

const renderToString = require("next-mdx-remote/render-to-string");

const matter = require("gray-matter");

const root = process.cwd();

export async function getFiles(type: string) {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type: string, slug: string) {
  if (process.browser === true) {
    return;
  }
  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);

  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        // eslint-disable-next-line
        import("remark-autolink-headings"),
        // eslint-disable-next-line
        import("remark-slug"),
        // eslint-disable-next-line
        // import("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });
  // eslint-disable-next-line
  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(type: string) {
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce((allPosts: IPosts[], postSlug: string) => {
    const source = fs.readFileSync(
      path.join(root, "data", type, postSlug),
      "utf8"
    );

    // console.log(source);
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
