"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import useTable, { UseTableProps } from "../../hooks/useTable"; // Import the useTable hook
import { TableTypes, UseTableDataItem } from "../../lib/types";

export interface BasicTableProps {
  type: TableTypes;
  initialPage?: number;
  limit?: number;
  onRowClick?: (item: UseTableDataItem<any>) => void;
}

export default function BasicTable<T extends UseTableDataItem<T>>({
  type,
  onRowClick,
  initialPage = 1,
  limit = 10,
}: BasicTableProps) {
  const tableProps: UseTableProps<T> = {
    type: type,
    initialPage: initialPage,
    limit: limit,
  };

  const { data, loading }: { data: T[]; loading: boolean } =
    useTable<T>(tableProps);

  console.log(data);

  // Determine table columns dynamically based on the first data item
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "1rem", boxShadow: 3 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            {columns?.map((column) => (
              <TableCell
                key={column}
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                {column}
              </TableCell>
            ))}
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
                }}
                className="cursor-pointer hover:underline"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{ color: "#424242" }}
                    onClick={() => onRowClick?.(row)}
                  >
                    {(row as any)[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
