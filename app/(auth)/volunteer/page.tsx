"use client";

import React from "react";
import LinkedinLogin from "../../../components/LinkedinLogin";


const Volunteer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="font-bold text-2xl">
        תודה רבה על רוח ההתנדבות!
        <br /> נעשה כל שביכולנתו על מנת לקשר אותך לאנשים הנכונים
      </h1>
      <p>
        למטרת שמירה על הביטחון שלכם\ן ושל כולנו, נבקש להתחבר באמצעות Linkedin
        על מנת לאמת את זהותכם
      </p>
      <p className="text-sm">
        *פרופיל הLinkedin ישמש גם כצורת ההתקשרות ביניכם/ן וממנו נמשוך את הפרטים
        על מנת לייצר כרטיס מתנדב
      </p>

      <LinkedinLogin />
    </div>
  );
};

export default Volunteer;
