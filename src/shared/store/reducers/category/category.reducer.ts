import { AnyAction } from "redux";

import { ICategoryState } from "./types";
import * as types from "../../actions/actionTypes";

const initialState: ICategoryState = {
  allCategories: []
};

export const category = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload
      };
    default:
      return state;
  }
};
