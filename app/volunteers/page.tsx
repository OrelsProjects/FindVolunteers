"use client";

import { linkedinProfilePrefix } from "@/lib/constants";
import BasicTable from "../../components/ui/table";
import { TableTypes, Volunteer } from "../../lib/types";

const Volunteers = () => {
  const onRowClick = async (item: Volunteer) => {
    window.open(
      `https://${linkedinProfilePrefix}${item.linkedinUrl}`,
      "_blank"
    );
  };

  return (
    <div className="p-8 flex justify-center items-center overflow-x-auto w-screen">
      <BasicTable
        type={TableTypes.VOLUNTEERS}
        onRowClick={onRowClick}
        rowCondition={(item: Volunteer) =>
          item.linkedinUrl !== undefined && item.linkedinUrl !== null
        }
      />
    </div>
  );
};

export default Volunteers;
