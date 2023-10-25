"use client";
import VolunteerCard from "./_components/volunteerCard";

const NewVolunteer = () => {
  // get user from session and display his info

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="font-bold text-2xl mb-6">
        יצרנו כרטיס מתנדב על פי חשבון הLinkedin שלך
      </h1>
      <VolunteerCard // TODO Fix this (Why requires toDocument?)
        name="Dani Dan"
        role="Expert Man"
        experienceYears={8}
        isEnabled
      />
    </div>
  );
};

export default NewVolunteer;
