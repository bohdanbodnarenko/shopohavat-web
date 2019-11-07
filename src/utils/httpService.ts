import axios from "axios";
import { Store } from "redux";
import { History } from "history";

import { logout } from "../shared/store/actions";
import { openNotification } from "./notificationService";

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || window.location.origin,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
  }
});

export const updateHttpServiceToken = (token: string) => {
  httpService.defaults.headers["Authorization"] = "Bearer " + token;
};

export const setupInterceptors = (store: Store, history: History) => {
  httpService.interceptors.response.use(
    response => {
      return Promise.resolve(response);
    },
    error => {
      if (!error.response) {
        openNotification("Server error", "error");
        return;
      }
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(logout());
        history.push("/");
        return Promise.reject(error.response);
      } else {
        if ([400, 404].includes(error.response.status)) {
          //   store.dispatch(addNotification(error.response.data.message));
          openNotification(error.message, "error");
          return Promise.reject(error.response);
        }
      }
      return Promise.reject(error.response);
    }
  );
};
