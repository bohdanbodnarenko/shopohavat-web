import { AnyAction } from "redux";

import * as types from "../../actions/actionTypes";
import { IProductState } from "./types";

const initialState: IProductState = {
  allProducts: [],
  selectedProduct: null
};

export const product = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case types.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    default:
      return state;
  }
};
