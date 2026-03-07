import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/preview");

export default function PreviewLayout({ children }) {
  return children;
}
