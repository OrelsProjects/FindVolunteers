import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const GenericButton = ({ children, ...rest }: Props) => {
  return (
    <Button {...rest}>
      {children}
    </Button>
  );
};

export default GenericButton;
