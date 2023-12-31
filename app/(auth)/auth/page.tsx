"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LinkedinLogin from "../../../components/LinkedinLogin";

const Volunteer = () => {
  const { session, userData }: { session: any; userData: any } =
    useRequireAuth();
  console.log("user data in volunteer", userData);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.push("/profile");
    }
  }, [userData]);

  if (session && (!userData || (userData && userData.volunteer))) {
    // maybe show here spinner
    return null;
  }

  return (
    <div className="flex flex-col items-center h-screen p-8 text-center">
      <h1 className="font-bold text-2xl">תודה רבה על רוח ההתנדבות!</h1>
      <p className="mt-4">
        למטרת שמירה על הביטחון שלכם ושל כולנו, נבקש להתחבר באמצעות Linkedin על
        מנת לאמת את זהותכם
      </p>
      <p className="text-sm mb-4">
        *פרופיל הLinkedin ישמש גם כצורת ההתקשרות ביניכם וממנו נמשוך את הפרטים על
        מנת לייצר כרטיס מתנדב
      </p>

      <LinkedinLogin />
    </div>
  );
};

export default Volunteer;
