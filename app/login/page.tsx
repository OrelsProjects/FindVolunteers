"use client";

import React from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";

// Define validation schema for the entire form
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address"),
  phone: Yup.string().matches(/^\+972\d{9}$/, "Invalid phone number"),
  password: Yup.string().min(8, "Password must be at least 8 characters long"),
});

const LoginPage = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema, // Add the schema here
  });

  return (
    <div>
      <h1>Login</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          {" "}
          {/* Notice the change here */}
          <Input
            name="phone"
            type="phone"
            label="Phone"
            placeholder="+972521231231"
          />
          <Button
            type="submit"
            onClick={() => {
              console.log("Clicked!");
            }}
          >
            Login
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default LoginPage;
