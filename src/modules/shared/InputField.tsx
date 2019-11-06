import * as React from "react";
import { FieldProps } from "formik";
import { Input, Form } from "antd";

const FormItem = Form.Item;

export const InputField = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps<any> & { prefix: React.ReactNode }) => {
  const errorMsg = touched && touched[field.name] && errors[field.name];
  return (
    <FormItem
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
      {...props}
    >
      <Input {...field} {...props} />
    </FormItem>
  );
};
