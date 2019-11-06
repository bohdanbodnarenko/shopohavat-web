import { AnyAction } from "redux";

import * as types from "../actionTypes";

export const loginSuccess = (sessionId: string): AnyAction => ({
  type: types.LOGIN_SUCCESS,
  payload: sessionId
});

export const setCurrentProvider = (provider: any): AnyAction => ({
  type: types.SET_CURRENT_PROVIDER,
  payload: provider
});

export const logout = (): AnyAction => {
  window.sessionStorage.setItem("accessToken", "");
  return {
    type: types.LOGOUT
  };
};
