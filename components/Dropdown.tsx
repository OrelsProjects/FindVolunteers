import { Field, FieldProps } from "formik";
import { Autocomplete, TextField } from "@mui/material";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps<T> {
  name: string;
  label: string;
  options: DropdownOption[];
}

function Dropdown<DropdownOption>({ name, label, options, ...props }: DropdownProps<DropdownOption>) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Autocomplete
          {...props}
          options={ options}
          getOptionLabel={(option) => `${option.label}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={Boolean(form.touched[name] && form.errors[name])}
              helperText={
                form.touched[name] && form.errors[name]
                  ? `${form.errors[name]}`
                  : undefined
              }
            />
          )}
          onChange={(_, value) => form.setFieldValue(name, value)}
          onBlur={() => form.setFieldTouched(name, true)}
          value={field.value}
        />
      )}
    </Field>
  );
}

export default Dropdown;
