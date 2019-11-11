import React, { useState } from "react";

import { FieldError } from "../../shared/types";
import RegisterView from "./ui/RegisterView";
import { httpService } from "../../utils/httpService";
import { openNotification } from "../../utils/notificationService";

const RegisterConnector = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const handleSubmit = async (provider: any) => {
    setLoading(true);

    try {
      const { data } = await httpService.post("/provider", provider);
      if (data) {
        openNotification("Registration Success", "success");
        props.history.push("/login");
      }
    } catch ({ data }) {
      setErrors(data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <RegisterView
      {...props}
      submit={handleSubmit}
      loading={loading}
      serverErrors={errors}
    />
  );
};

export default RegisterConnector;
