"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REASON_VOLUNTEER = "volunteer";
const REASON_PROJECT_OWNER = "project_owner";

function Home() {
  const router = useRouter();
  const { userData }: { userData: any } = useRequireAuth();

  useEffect(() => {
    if (userData && userData.volunteer) {
      router.push("/profile");
    }
  }, [userData]);

  return (
    <div className="flex flex-col gap-6 m-auto items-center p-8">
      {/* Tailwind css loading circle */}
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-300"></div>
    </div>
  );
}

export default Home;
