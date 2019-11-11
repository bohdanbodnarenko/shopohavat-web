import { IProvider } from "../../../../utils/entityTypes";

export interface IAuthState {
  accessToken: string;
  isAuth: boolean;
  currentProvider: IProvider | null;
}
