"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ResumeProvider } from "@/context/ResumeContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ResumeProvider>{children}</ResumeProvider>
    </AuthProvider>
  );
}
