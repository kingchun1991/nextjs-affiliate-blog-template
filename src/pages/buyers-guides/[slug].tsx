import hydrate from "next-mdx-remote/hydrate";
import { getFiles, getFileBySlug } from "../../lib/mdx";
import BlogLayout from "../../components/layout/blog";
import MDXComponents from "../../components/MDXComponents";
import { IFrontMatter } from "../../types/custom-types";

export default function Blog({
  mdxSource,
  frontMatter,
}: {
  mdxSource: any;
  frontMatter: IFrontMatter;
}) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>;
}

export async function getStaticPaths() {
  const posts = await getFiles("buyers-guides");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post = await getFileBySlug("buyers-guides", params.slug);

  return { props: post };
}
