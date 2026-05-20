import { getAllWork } from "@/lib/mdx";
import { WorkIndex } from "@/components/sections/work-index";

export const metadata = { title: "Work" };

export default async function WorkPage() {
  const items = await getAllWork();
  return <WorkIndex items={items} />;
}
