"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery"; // <-- Add this import for media queries
import { getTableMapping } from "@/lib/tableMapping";
import Image from "next/image";
import { useEffect } from "react";
import useTable, { UseTableProps } from "../../hooks/useTable"; // Import the useTable hook
import { TableTypes, UseTableDataItem } from "../../lib/types";

export interface BasicTableProps {
  type: TableTypes;
  initialPage?: number;
  limit?: number;
  onRowClick?: (item: any) => void;
  rowCondition?: (item: any) => boolean;
}

export default function BasicTable<T extends UseTableDataItem<T>>({
  type,
  onRowClick: onClick,
  initialPage = 1,
  limit = 10,
  rowCondition = () => true,
}: BasicTableProps) {
  const tableProps: UseTableProps<T> = {
    type: type,
    initialPage: initialPage,
    limit: limit,
  };

  const { data, loading }: { data: T[]; loading: boolean } =
    useTable<T>(tableProps);

  const matches = useMediaQuery("(max-width:600px)"); // <-- Add media query check

  const [columnsMapping, setColumsMapping] = React.useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setColumsMapping(getTableMapping(type));
  }, [type]);

  const isMapContainsKey = (key: string): boolean =>
    Object.keys(columnsMapping).includes(key);

  // Determine table columns dynamically based on the first data item
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-300"></div>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "1rem",
        boxShadow: 3,
        minWidth: 350,
        width: 650,
        direction: "rtl",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 350, width: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            {columns?.map(
              (column: string) =>
                isMapContainsKey(column) && (
                  <TableCell
                    className="p-0"
                    key={column}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: 0,
                    }}
                  >
                    {columnsMapping[column]}
                  </TableCell>
                )
            )}
            {type === TableTypes.VOLUNTEERS && (
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                לינקדין
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell sx={{ color: "#757575" }}>Loading...</TableCell>
            </TableRow>
          ) : (
            data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f3f6fc" },
                  "&:hover": { backgroundColor: "#509be69e" },
                  "&:last-child>td": { borderBottom: "none" },
                }}
              >
                {columns.map(
                  (column) =>
                    isMapContainsKey(column) &&
                    rowCondition(row) && (
                      <TableCell
                        key={column}
                        sx={{
                          color: "#424242",
                          textAlign: "center",
                          padding: 0,
                        }}
                      >
                        {(row as any)[column]}
                      </TableCell>
                    )
                )}
                {type === TableTypes.VOLUNTEERS && rowCondition(row) && (
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Image
                        src="/linkedin_icon.png"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        className="hover:cursor-pointer"
                        onClick={() => onClick?.(row)}
                      />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
