import { generateMetadata as getMetadata } from "@/lib/metadata";

export const metadata = getMetadata("/dashboard");

export default function DashboardLayout({ children }) {
  return children;
}
