"use client";

import React from "react";
import { useFormik, FormikProvider } from "formik";
import Button from "@/components/Button"; // Replace 'path_to_GenericButton' with the correct path
import Input from "@/components/Input"; // Replace 'path_to_Input' with the correct path

const Volunteer = () => {
  const formik = useFormik({
    initialValues: {
      linkedinURL: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="font-bold text-2xl">תודה רבה על רוח ההתנדבות!<br/> נעשה כל שביכולנתו על מנת לקשר אותך לאנשים הנכונים</h1>
      <p>למטרת שמירה על הביטחון שלכם\ן ושל כולנו, נבקש להתחבר באמצעות Linkedin על מנת לאמת את זהותם</p>
      <p className="text-sm">*פרופיל הLinkedin ישמש גם כצורת ההתקשרות ביניכם/ן וממנו נמשוך את הפרטים על מנת לייצר כרטיס מתנדב</p>

      <FormikProvider value={formik}>
        <Input
          name="linkedinURL"
          label="Linkedin URL"
          type="email"
          placeholder="הכנס"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.linkedinURL}
        />

        <Button className="bg-primary text-white" type="submit">
          המשך
        </Button>
      </FormikProvider>
    </div>
  );
};

export default Volunteer;
