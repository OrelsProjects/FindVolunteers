"use client";
import { useSession } from "next-auth/react";
import VolunteerCard from "./_components/volunteerCard";

import type { Session } from "next-auth";
import useRequireAuth from "@/hooks/useRequireAuth";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    experienceYears: number;
    id: string;
  };
}

const NewVolunteer = () => {
  // get user from session and display his info
  // @ts-ignore
  // const { data: session } : { data: CustomSession} = useSession();
  const { session, userData } = useRequireAuth();
  console.log('user data in new volunteer', userData);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="font-bold text-2xl mb-6">
        יצרנו כרטיס מתנדב על פי חשבון הLinkedin שלך
      </h1>
      <VolunteerCard
        name={session?.user?.name || ""}
        role={session?.user?.role || ""}
        experienceYears={session?.user?.experienceYears || 1}
        // id={session?.user?.id || ""}
        id={"ozKSEjIa47XwVUnUJh0F"}
      />
    </div>
  );
};

export default NewVolunteer;
