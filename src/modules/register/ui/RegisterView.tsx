import * as React from "react";
import { Form, Icon, Button, Typography } from "antd";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { Link } from "react-router-dom";

import { IRegisterValues, validProviderSchema } from "../types";
import { InputField } from "../../shared/InputField";

import "./styles.css";
import { FieldError } from "../../../shared/types";
import { useEffect } from "react";

const FormItem = Form.Item;

interface IProps extends FormikProps<IRegisterValues> {
  submit: (values: IRegisterValues) => Promise<FormikErrors<IRegisterValues>>;
  loading: boolean;
  serverErrors: FieldError[];
}

const RegisterView = (props: IProps) => {
  useEffect(() => {
    props.serverErrors.forEach(
      error => (props.errors[error.path] = error.message)
    );
    // eslint-disable-next-line
  }, [props.serverErrors]);

  const { handleSubmit, loading } = props;

  return (
    <Form onSubmit={handleSubmit} className="register-wrapper">
      <Typography.Title>Register</Typography.Title>
      <Field
        name="email"
        label="Email"
        required
        prefix={<Icon type="user" className="register_icon" />}
        component={InputField}
        type="email"
        placeholder="Email"
      />
      <Field
        label="Password"
        required
        name="password"
        prefix={<Icon type="lock" className="register_icon" />}
        type="password"
        placeholder="Password"
        component={InputField}
      />
      <Field
        label="Name"
        required
        name="name"
        prefix={<Icon type="experiment" className="register_icon" />}
        type="text"
        component={InputField}
        placeholder="Name"
      />
      <Field
        label="Phone"
        name="phone"
        required
        prefix={<Icon type="phone" />}
        type="phone"
        component={InputField}
        placeholder="Phone"
      />
      <Field
        label="Site"
        name="url"
        prefix={<Icon type="global" className="register_icon" />}
        type="url"
        component={InputField}
        placeholder="Site"
      />
      <FormItem>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Register
        </Button>
      </FormItem>
      <FormItem>
        Or <Link to="/login">login now!</Link>
      </FormItem>
    </Form>
  );
};

export default withFormik<IProps, IRegisterValues>({
  validationSchema: validProviderSchema,
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    phone: ""
  }),
  handleSubmit: async (values, { props }) => {
    values.phones = [values.phone];
    await props.submit(values);
  }
})(RegisterView);
