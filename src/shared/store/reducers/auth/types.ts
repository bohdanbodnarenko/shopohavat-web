export interface IAuthState {
  sessionToken: string;
  isAuth: boolean;
  errors: [{ path: string; message: string }] | null;
  currentProvider: any | null;
}
