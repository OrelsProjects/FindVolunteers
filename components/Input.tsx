import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface InputProps {
  name: string;
  label: string;
  value?: string;
  type: "email" | "phone" | "password";
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  type,
  placeholder,
  onChange,
  onBlur,
}) => {
  const [field, meta] = useField(name);
  const inputType = type === "password" ? "password" : "text";
  const inputLabel = label || name;

  return (
    <TextField
      {...field}
      label={inputLabel}
      value={value}
      type={inputType}
      placeholder={placeholder}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      fullWidth
      margin="normal"
      variant="outlined"
      inputProps={{
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: "false",
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputMode={type === "phone" ? "tel" : undefined}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;
