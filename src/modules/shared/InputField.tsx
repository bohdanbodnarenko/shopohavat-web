import * as React from "react";
import { FieldProps } from "formik";
import { Input, Form } from "antd";

const FormItem = Form.Item;

export const InputField: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode }
> = ({ field, form: { touched, errors }, ...props }) => {
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
