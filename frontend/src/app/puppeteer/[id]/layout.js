import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/puppeteer/[id]");

export default function PuppeteerLayout({ children }) {
  return children;
}
