import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/about");

export default function AboutLayout({ children }) {
  return children;
}
