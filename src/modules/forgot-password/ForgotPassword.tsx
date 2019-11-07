import React, { SyntheticEvent, useState } from "react";
import { Button, Form, Icon, Typography } from "antd";
import { Field, FormikProps, withFormik } from "formik";

import { InputField } from "../shared/InputField";
import { IForgotPasswordValues } from "./types";
import "./styles.css";
import { Link } from "react-router-dom";
import { httpService } from "../../utils/httpService";
import { openNotification } from "../../utils/notificationService";
import { validPassword } from "../register/types";
import { FieldError } from "../../shared/types";

const FormItem = Form.Item;

const ForgotPassword = (props: FormikProps<IForgotPasswordValues> & any) => {
  const {
    match: {
      params: { recoverId }
    }
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const {
      values: { email, password, repeatPassword }
    } = props;

    if (password && repeatPassword) {
      try {
        await validPassword.validate(password);
      } catch (error) {
        props.setErrors({ password: error.message });
        return;
      }
      if (password !== repeatPassword) {
        props.setErrors({ repeatPassword: "Passwords do not match" });
        return;
      }
    }

    setLoading(true);
    try {
      if (recoverId) {
        await httpService.post(`/change-password/${recoverId}`, { password });
        openNotification(
          `The password successfully changed, please login`,

          "success"
        );
        setEmailSent(true);
      } else {
        await httpService.post("/change-password", { email });
        openNotification(
          `The recover email to ${email} successfully sent`,
          "success"
        );
      }
    } catch ({ response: { data } }) {
      if (data[0].path === "key") {
        return props.setErrors({
          password: "Invalid recover url, try send email again"
        });
      }
      data.forEach(
        (error: FieldError) => (props.errors[error.path] = error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = recoverId ? (
    <React.Fragment>
      <Field
        name="password"
        label="New password"
        required
        prefix={<Icon type="lock" />}
        component={InputField}
        type="password"
        placeholder="Password"
      />
      <Field
        name="repeatPassword"
        label="Repeat your password"
        required
        prefix={<Icon type="sync" />}
        component={InputField}
        type="password"
        placeholder="Repeat your password"
      />
    </React.Fragment>
  ) : (
    <Field
      name="email"
      label="Email"
      required
      prefix={<Icon type="user" className="register_icon" />}
      component={InputField}
      type="email"
      placeholder="Email"
    />
  );

  return (
    <Form onSubmit={handleSubmit} className={"forgot-password-wrapper"}>
      <Typography.Title>Forgot Password</Typography.Title>
      {fields}
      <FormItem>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {recoverId ? "Change password" : "Send email"}
        </Button>
      </FormItem>
      {emailSent && (
        <FormItem>
          <Typography>Please check your email</Typography>
        </FormItem>
      )}
      <FormItem>
        Or <Link to="/login">login now!</Link>
      </FormItem>
    </Form>
  );
};

export default withFormik<
  FormikProps<IForgotPasswordValues>,
  IForgotPasswordValues
>({
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
      repeatPassword: ""
    };
  },
  handleSubmit: () => {}
})(ForgotPassword);
