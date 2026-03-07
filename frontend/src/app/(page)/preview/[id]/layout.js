import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/preview/[id]");

export default function PreviewIdLayout({ children }) {
  return children;
}
