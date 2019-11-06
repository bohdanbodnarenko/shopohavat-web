import * as React from "react";
import { Form, Icon, Button, Typography, List } from "antd";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { Link } from "react-router-dom";

import { IRegisterValues, validProviderSchema } from "../types";
import { InputField } from "../../shared/InputField";

import "./styles.css";

const FormItem = Form.Item;
const defaultPhonePrefix = "+380";

interface IProps extends FormikProps<IRegisterValues> {
  submit: (values: IRegisterValues) => Promise<FormikErrors<IRegisterValues>>;
  loading: boolean;
  serverErrors: any;
}

class RegisterView extends React.Component<IProps> {
  validatePhone = (phone: string): boolean => {
    return new RegExp(/^((\+[380])+([0-9]){11})$/).test(phone);
  };

  handleAddClick = () => {
    const { phone, phones } = this.props.values;
    if (this.validatePhone(phone)) {
      if (phones.includes(phone)) {
        this.props.setFieldValue("phone", defaultPhonePrefix);

        return;
      }
      this.props.setValues({
        ...this.props.values,
        phones: [...phones, phone],
        phone: defaultPhonePrefix
      });
    } else {
      this.props.setErrors({ phone: "Phone is not valid" });
    }
  };

  handleDeleteClick = (phone: string) => () => {
    const { phones } = this.props.values;
    const indexToDelete = phones.indexOf(phone);
    if (indexToDelete >= 0) {
      phones.splice(indexToDelete, 1);
      this.props.setValues({
        ...this.props.values,
        phones
      });
    }
  };

  componentWillUpdate(nextProps: IProps) {
    if (nextProps.serverErrors !== this.props.serverErrors) {
      const { serverErrors } = nextProps;
      if (Array.isArray(serverErrors)) {
        const errors: FormikErrors<IRegisterValues> = {};
        serverErrors.forEach((obj: any) => {
          errors[obj.path] = obj.message;
        });
        this.props.setErrors(errors);
      }
    }
  }

  handlePhoneChange = (event: any) => {
    this.props.setFieldValue("phone", event.target.value);
    this.handleAddClick();
  };

  render() {
    const { phones } = this.props.values;
    const { handleSubmit, loading } = this.props;
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
          label="Phones"
          name="phone"
          prefix={<Icon type="phone" />}
          type="phone"
          onChange={this.handlePhoneChange}
          component={InputField}
          placeholder="Phones"
          addonAfter={
            <Button
              onClick={this.handleAddClick}
              className="add-icon"
              shape="circle"
              icon="plus"
              size="small"
            />
          }
        />
        {phones.length > 0 && (
          <List
            bordered
            dataSource={phones}
            renderItem={item => (
              <List.Item>
                {item}
                <Button
                  className="delete-icon"
                  shape="circle"
                  icon="delete"
                  size="small"
                  onClick={this.handleDeleteClick(item)}
                />
              </List.Item>
            )}
          />
        )}
        <Field
          label="Site"
          name="site"
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
  }
}

export default withFormik<IProps, IRegisterValues>({
  validationSchema: validProviderSchema,
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    phone: defaultPhonePrefix,
    phones: []
  }),
  handleSubmit: async (values, { props }) => {
    await props.submit(values);
  }
})(RegisterView);
