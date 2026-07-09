import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function AdminGuard({ children }: { children: ReactNode }) {
  // Bypassed for local development
  return <>{children}</>;
}
