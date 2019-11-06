import { AnyAction } from "redux";

import * as types from "../../actions/actionTypes";
import { IAuthState } from "./types";

const initialState: IAuthState = {
  accessToken: "",
  isAuth: false,
  currentProvider: null
};

export const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        accessToken: action.payload
      };

    case types.SET_CURRENT_PROVIDER:
      return {
        ...state,
        currentProvider: action.payload,
        isAuth: true
      };

    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
