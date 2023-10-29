import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const GenericButton = ({ children, ...rest }: Props) => {
  return <Button {...rest}>{children}</Button>;
};

export default GenericButton;
