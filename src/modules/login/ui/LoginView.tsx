import * as React from "react";
import { Form, Icon, Button, Typography } from "antd";
import { withFormik, Field, FormikProps } from "formik";
import { Link } from "react-router-dom";

import { InputField } from "../../shared/InputField";
import { LoginFormValues } from "../types";
import "./styles.css";
import { validLoginSchema } from "../../register/types";
import { FieldError } from "../../../shared/types";
import { useEffect } from "react";

const FormItem = Form.Item;

interface IProps {
  submit: (values: LoginFormValues) => any;
  loading: boolean;
  serverErrors: FieldError[];
}

const LoginView = (props: IProps & FormikProps<LoginFormValues>) => {
  useEffect(() => {
    props.serverErrors.forEach(
      error => (props.errors[error.path] = error.message)
    );
    // eslint-disable-next-line
  }, [props.serverErrors]);

  const { handleSubmit, loading } = props;
  return (
    <form
      style={{ width: "40vw", margin: "auto" }}
      className={"login-wrapper"}
      onSubmit={handleSubmit}
    >
      <Typography.Title>Login</Typography.Title>
      <Field
        name="email"
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Email"
        component={InputField}
        type="email"
      />
      <Field
        name="password"
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        type="password"
        placeholder="Password"
        component={InputField}
      />
      <FormItem>
        <Link to="/forgot-password">Forgot password</Link>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          className="login-form-button"
        >
          Login
        </Button>
      </FormItem>
      <FormItem>
        Or <Link to="/register">Register now!</Link>
      </FormItem>
    </form>
  );
};

export default withFormik<IProps, LoginFormValues>({
  validationSchema: validLoginSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props }) => {
    props.submit(values);
  }
})(LoginView);
