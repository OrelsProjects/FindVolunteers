"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LinkedinLogin from "../../../components/LinkedinLogin";

const Volunteer = () => {
  const { userData }: { userData: any } = useRequireAuth();
  console.log("user data in volunteer", userData);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.push("/new-volunteer");
    }
  }, [userData]);

  if (!userData || (userData && userData.volunteer)) {
    // maybe show here spinner
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
      <h1 className="font-bold text-2xl">
        תודה רבה על רוח ההתנדבות!
        <br /> נעשה כל שביכולנתו על מנת לקשר אותך לאנשים הנכונים
      </h1>
      <p className="mt-4">
        למטרת שמירה על הביטחון שלכם/ן ושל כולנו, נבקש להתחבר באמצעות Linkedin על
        מנת לאמת את זהותכם
      </p>
      <p className="text-sm mb-4">
        *פרופיל הLinkedin ישמש גם כצורת ההתקשרות ביניכם/ן וממנו נמשוך את הפרטים
        על מנת לייצר כרטיס מתנדב
      </p>

      <LinkedinLogin />
    </div>
  );
};

export default Volunteer;
