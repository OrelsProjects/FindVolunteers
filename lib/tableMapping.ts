import { TableTypes } from "./types";

const getVolunteersMapping = (): Record<string, string> => {
  return {
    experienceYears: "שנות ניסיון",
    role: "תפקיד",
    name: "שם",
  };
};

export const getTableMapping = (
  tableType: TableTypes
): Record<string, string> => {
  switch (tableType) {
    case TableTypes.VOLUNTEERS:
      return getVolunteersMapping();
    default:
      return {};
  }
};
