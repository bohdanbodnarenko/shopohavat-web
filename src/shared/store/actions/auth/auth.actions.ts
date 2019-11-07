import { AnyAction } from "redux";

import * as types from "../actionTypes";

export const loginSuccess = (token: string): AnyAction => {
  window.localStorage.setItem("accessToken", token);
  return {
    type: types.LOGIN_SUCCESS,
    payload: token
  };
};

export const setCurrentProvider = (provider: any): AnyAction => {
  window.localStorage.setItem("currentProvider", JSON.stringify(provider));
  return {
    type: types.SET_CURRENT_PROVIDER,
    payload: provider
  };
};

export const logout = (): AnyAction => {
  window.localStorage.setItem("accessToken", "");
  return {
    type: types.LOGOUT
  };
};
