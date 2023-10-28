"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RadioButtonGroup from "../components/RadioButtonGroup";

const REASON_VOLUNTEER = "volunteer";
const REASON_PROJECT_OWNER = "project_owner";

function Home() {
  const router = useRouter();
  const { session, userData }: { session: any; userData: any } =
    useRequireAuth();
  console.log("userData in main page", userData);

  useEffect(() => {
    if (userData && userData.volunteer) {
      router.push("/profile");
    }
  }, [userData]);

  if (session && (!userData || (userData && userData.volunteer))) {
    // maybe show here spinner
    return null;
  }

  const onReasonSelected = (reason: string) => {
    if (reason === REASON_VOLUNTEER) {
      router.push("/auth");
    } else if (reason === REASON_PROJECT_OWNER) {
      router.push("/project-owner");
    }
  };

  return (
    <div className="flex flex-col gap-6 m-auto items-center p-8">
      {/* Tailwind css loading circle */}
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-300"></div>
    </div>
  );
}

export default Home;
