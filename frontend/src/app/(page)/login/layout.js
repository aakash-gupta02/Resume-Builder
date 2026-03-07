import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/login");

export default function LoginLayout({ children }) {
  return children;
}
