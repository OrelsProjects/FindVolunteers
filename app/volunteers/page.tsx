"use client";

import { linkedinProfilePrefix } from "@/lib/constants";
import BasicTable from "../../components/ui/table";
import { TableTypes, UseTableDataItem, Volunteer } from "../../lib/types";

const Volunteers = () => {
  const onRowClick = async (item: UseTableDataItem<Volunteer>) => {
    console.log("item clicked", item);
    window.open(
      // @ts-ignore
      `https://${linkedinProfilePrefix}${item.linkedinUrl}`,
      "_blank"
    );
  };

  return (
    <div className="p-8">
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
