import { httpService } from "../../../../utils/httpService";
import { SET_ALL_CATEGORIES } from "../actionTypes";
import { Dispatch } from "react";

export const getAllCategories = () => async (dispatch: Dispatch<any>) => {
  const { data } = await httpService.get("/category/all");
  dispatch({ type: SET_ALL_CATEGORIES, payload: data });
};
