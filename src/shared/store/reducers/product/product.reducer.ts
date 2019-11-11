import { AnyAction } from "redux";

import { IProductState } from "./types";

const initialState: IProductState = {
  allProducts: []
};

export const product = (state = initialState, action: AnyAction) => {
  return state;
};
