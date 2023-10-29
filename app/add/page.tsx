"use client";

import { Field, Form, Formik } from "formik";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";

interface FormValues {
  input: string;
  dropdown: string;
}

const AddVolunteer = () => {
  const initialValues = {
    input: "",
    dropdown: "",
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const dropdownOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field name="input">
          {({ field }: { field: any }) => (
            <Input {...field} placeholder="Input" />
          )}
        </Field>
        <Field name="dropdown">
          {({ field }: { field: any }) => (
            <Dropdown
              {...field}
              options={dropdownOptions}
              placeholder="Select an option"
            />
          )}
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};

export default AddVolunteer;
