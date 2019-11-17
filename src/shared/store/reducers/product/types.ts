import { IProduct } from "../../../../utils/entityTypes";

export interface IProductState {
  allProducts: IProduct[];
  selectedProduct: IProduct | null;
}
