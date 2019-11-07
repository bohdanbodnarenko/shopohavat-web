import * as React from "react";
import { useState } from "react";

import { loginSuccess, setCurrentProvider } from "../../shared/store/actions";
import { reduxConnect } from "../../shared/hoc/reduxConnector/reduxConnect";
import LoginView from "./ui/LoginView";
import { LoginFormValues } from "./types";
import { httpService } from "../../utils/httpService";
import { FieldError } from "../../shared/types";
import { openNotification } from "../../utils/notificationService";

const LoginConnector = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const submit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const {
        data: { token, provider }
      } = await httpService.post("/login", values);
      if (token && provider) {
        openNotification("Login success!", "success");
        props.loginSuccess(token);
        props.setCurrentProvider(provider);
        props.history.push("/admin");
      }
    } catch ({ response  }) {
        if (!response) {
          return;
        }
        const { data } = response;
      setErrors(data);
    } finally {
      setLoading(false);
    }
  };

  return <LoginView submit={submit} loading={loading} serverErrors={errors} />;
};

export default reduxConnect(LoginConnector, {
  loginSuccess,
  setCurrentProvider
});
