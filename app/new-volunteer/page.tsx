"use client";
import { useSession } from "next-auth/react";
import VolunteerCard from "./_components/volunteerCard";

import type { Session } from "next-auth";
import useRequireAuth from "@/hooks/useRequireAuth";

// interface CustomSession extends Session {
//   user: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     role: string;
//     experienceYears: number;
//     id: string;
//   };
// }

const NewVolunteer = () => {
  // @ts-ignore
  // const { data: session } : { data: CustomSession} = useSession();

  // get user from session and display his info
  const {
    userData,
    updateVolunteerData,
    session,
  }: {
    userData: any;
    updateVolunteerData: (values: any) => void;
    session: any;
  } = useRequireAuth();
  console.log("user data in new volunteer", userData);

  if (!userData) {
    // maybe show here spinner
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1
        className={`font-bold text-2xl ${
          !userData?.volunteer?.role ? "mb-2" : "mb-6"
        }`}
      >
        יצרנו כרטיס מתנדב על פי חשבון הLinkedin שלך
      </h1>
      {!userData?.volunteer?.role && (
        <h2 className="mb-6">
          אנא מלא את הפרטים החסרים על מנת להשלים את התהליך
        </h2>
      )}
      <VolunteerCard
        name={userData?.volunteer?.name || session?.user?.name || ""}
        role={userData?.volunteer?.role || ""}
        experienceYears={userData?.volunteer?.experienceYears || 1}
        id={userData?.volunteer?.id || ""}
        isEnabled={userData?.volunteer ? userData?.volunteer.isEnabled : true}
        email={session?.user?.email}
        onSubmit={updateVolunteerData}
      />
    </div>
  );
};

export default NewVolunteer;
