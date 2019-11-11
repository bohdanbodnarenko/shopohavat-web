import { AnyAction } from "redux";
import { IProviderState } from "./types";

const initialState: IProviderState = {
  selectedProvider: undefined
};

export const provider = (state = initialState, action: AnyAction) => {
  return state;
};
