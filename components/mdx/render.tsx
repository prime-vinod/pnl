import { MDXRemote } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "./index";

export function MDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
