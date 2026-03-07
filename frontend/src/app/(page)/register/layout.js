import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/register");

export default function RegisterLayout({ children }) {
  return children;
}
