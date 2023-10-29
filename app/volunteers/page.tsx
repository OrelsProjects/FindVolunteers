"use client";

import axios from "axios";
import BasicTable from "../../components/ui/table";
import {
  ApiResponse,
  TableTypes,
  UseTableDataItem,
  Volunteer,
} from "../../lib/types";
import React, { useState } from "react";

const Volunteers = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onRowClick = async (item: UseTableDataItem<Volunteer>) => {
    console.log("item clicked", item);
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse<string | null>>(
        `/api/volunteer/linkedin`,
        {
          params: {
            id: item.id,
          },
        }
      );
      const url = response.data.result;
      if (url) {
        window.open(`${url}`, "_blank");
      }
      // Open url in new tab if not null
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      setLoading(false);
    }
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
