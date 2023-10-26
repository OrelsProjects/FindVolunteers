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
  // @ts-ignore
  // const { data: session } : { data: CustomSession} = useSession();

  // get user from session and display his info
  const { userData, updateVolunteerData }: { userData: any; setUserData: () => void } =
    useRequireAuth();
  console.log("user data in new volunteer", userData);

  if (!userData) {
    // maybe show here spinner
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="font-bold text-2xl mb-6">
        יצרנו כרטיס מתנדב על פי חשבון הLinkedin שלך
      </h1>
      <VolunteerCard
        name={userData?.volunteer?.name || ""}
        role={userData?.volunteer?.role || ""}
        experienceYears={userData?.volunteer?.experienceYears || 1}
        id={userData?.volunteer?.id || ""}
        isEnabled={userData?.volunteer ? userData?.volunteer.isEnabled : true}
        onSubmit={updateVolunteerData}
      />
    </div>
  );
};

export default NewVolunteer;
