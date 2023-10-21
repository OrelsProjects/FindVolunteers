"use client";

import { useRouter } from "next/navigation";
import RadioButtonGroup from "../components/RadioButtonGroup";
import { useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Volunteer } from "@/lib/types";

const REASON_VOLUNTEER = "volunteer";
const REASON_PROJECT_OWNER = "project_owner";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const volunteer: Volunteer = new Volunteer("Fullstack", 4, "343");

    axios.post<Volunteer>("/api/volunteer", volunteer);
  }, []);

  const onReasonSelected = (reason: string) => {
    if (reason === REASON_VOLUNTEER) {
      router.push("/volunteer");
    } else if (reason === REASON_PROJECT_OWNER) {
      router.push("/project-owner");
    }
  };

  return (
    <div className="flex flex-col gap-6 m-auto">
      <h1 className="font-bold text-2xl">
        מקשרים בין מפתחים ומפתחות לבעלי ובעלות פרויקטים שמטרתם להעניק סיוע בימי
        מלחמה
      </h1>
      <p>יש לבחור את הסיבה לשמה הגעתם לאתר:</p>
      <RadioButtonGroup
        onClick={onReasonSelected}
        items={[
          { label: "אני רוצה להתנדב", value: REASON_VOLUNTEER },
          { label: "אני מחפש מפתח/ת", value: REASON_PROJECT_OWNER },
        ]}
      />
    </div>
  );
}

export default Home;
