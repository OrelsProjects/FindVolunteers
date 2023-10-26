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
      router.push("/new-volunteer");
    }
  }, [userData]);

  if (session && (!userData || (userData && userData.volunteer))) {
    // maybe show here spinner
    return null;
  }

  const onReasonSelected = (reason: string) => {
    if (reason === REASON_VOLUNTEER) {
      router.push("/volunteer");
    } else if (reason === REASON_PROJECT_OWNER) {
      router.push("/project-owner");
    }
  };

  return (
    <div className="flex flex-col gap-6 m-auto items-center p-8">
      <h1 className="font-bold text-4xl text-center">
        מקשרים בין מפתחים לבעלי פרויקטים <br /> שמטרתם להעניק סיוע בימי מלחמה
      </h1>
      <p className="text-2xl">אז מה תרצו לעשות?</p>
      <RadioButtonGroup
        onClick={onReasonSelected}
        items={[
          { label: "אני רוצה להתנדב", value: REASON_VOLUNTEER },
          { label: "אני מחפש מפתחים", value: REASON_PROJECT_OWNER },
        ]}
      />
    </div>
  );
}

export default Home;
