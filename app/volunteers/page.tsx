"use client";

import React, { useState } from "react";
import BasicTable from "../../components/ui/table";
import { ApiResponse, TableTypes, Volunteer } from "../../lib/types";
import axios from "axios";
const Volunteers = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onRowClick = async (item: Volunteer) => {
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
        window.open(`https://www.linkedin.com/in/${url}`, "_blank");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      setLoading(false);
    }
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
