"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  name: string;
  role: string;
  experienceYears: number;
}

const VolunteerCard = ({ name, role, experienceYears }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const onEditModeClick = () => {
    console.log("edit mode clicked");
    setEditMode((prevValue) => !prevValue);
  };

  return (
    <div className="shadow-sm rounded-lg border border-[hsl(240_5.9%_90%) w-[350px] p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">כרטיס מתנדב</span>
        <Button
          variant="text"
          color="inherit"
          startIcon={<EditIcon sx={{ marginLeft: "5px" }} />}
          onClick={onEditModeClick}
        >
          עריכה
        </Button>
      </div>
      {!editMode && (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">שם:</span>
              <span className="text-sm">{name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">תפקיד:</span>
              <span className="text-sm">{role}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">שנות ניסיון:</span>
              <span className="text-sm">{experienceYears}</span>
            </div>
          </div>
          {/* <div className="h-16" /> */}
        </>
      )}
      {editMode && (<div>מצב עריכה</div>)}
    </div>
  );
};

export default VolunteerCard;
