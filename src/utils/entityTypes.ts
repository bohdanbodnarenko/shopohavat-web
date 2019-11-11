export interface IProvider {
  id: number;
  email: string;
  name: string;
  confirmed: boolean;
  forgotPasswordLocked: boolean;
  phones: string[];
  site?: string;
  description?: string;
  openTime?: string;
  closeTime?: string;
  address?: string;
  promos?: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  ingredients?: string;
  weight?: number;
  volume?: number;
  count?: number;
  description?: number;
  url?: string;
  price: number;
  deliverable: boolean;
  categories: ICategory[];
}

export interface IProductWithProvider extends IProduct {
  provider: IProvider;
}
