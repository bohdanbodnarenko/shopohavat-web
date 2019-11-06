import { notification } from "antd";

export const openNotification = (
  message: string,
  status: "success" | "warn" | "info" | "warning" | "error" | "",
  description: string = ""
) => {
  notification[status]({
    message,
    description
  });
};
