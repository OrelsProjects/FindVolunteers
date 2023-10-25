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

import useTable, { UseTableProps, UseTableTypes } from "../../hooks/useTable"; // Import the useTable hook
import { UseTableDataItem } from "@/lib/types";

export default function BasicTable<T extends UseTableDataItem<T>>() {
  const tableProps: UseTableProps<T> = {
    type: UseTableTypes.VOLUNTEERS,
    initialPage: 1,
    limit: 10,
  };

  const { data, loading }: { data: T[]; loading: boolean } =
    useTable<T>(tableProps);

  // Determine table columns dynamically based on the first data item
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
  debugger;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            // Show a loading indicator while data is being fetched
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : (
            // Map the data from useTable to the table rows dynamically
            data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column}>{(row as any)[column]}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
