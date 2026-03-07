import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/editor/[id]");

export default function EditorIdLayout({ children }) {
  return children;
}
