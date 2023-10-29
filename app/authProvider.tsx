"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavProvider from "./navProvider";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const {
    status,
  }: {
    status: any;
  } = useRequireAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status]);

  return status === "unauthenticated" ? (
    children
  ) : (
    <NavProvider>{children} </NavProvider>
  );
};

export default AuthProvider;
