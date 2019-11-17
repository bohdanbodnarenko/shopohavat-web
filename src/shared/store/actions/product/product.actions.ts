import { AnyAction, Dispatch } from "redux";
import { httpService } from "../../../../utils/httpService";
import { SET_ALL_PRODUCTS, SET_SELECTED_PRODUCT } from "../actionTypes";

interface IGetProductsParams {
  providerId?: number;
  categoryId?: number;
  limit?: number;
  offset?: number;
}

export const getProducts = (params?: IGetProductsParams) => async (
  dispatch: Dispatch
) => {
  let path = "/product/all?";
  if (params) {
    Object.entries(params).forEach(
      ([key, value]) => (path += `${key}=${value}&`)
    );
  }
  try {
    const { data } = await httpService.get(path);
    dispatch({ type: SET_ALL_PRODUCTS, payload: data });
  } catch ({ data }) {
    console.log(data);
  }
};

export const getProduct = (productId: number) => async (
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const { data } = await httpService.get(`/product/${productId}`);
    dispatch({ type: SET_SELECTED_PRODUCT, payload: data });
  } catch (e) {
    console.log(e);
  }
};
