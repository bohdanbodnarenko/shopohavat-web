import * as yup from "yup";

export interface ProductValues {
  name: string;
  price?: number;
  deliverable: boolean;
  categories: Array<number>;
  ingredients?: string;
  weight?: number;
  volume?: number;
  count?: number;
  description?: number;
  url?: string;
}

export const validProductSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(50),

  ingredients: yup.string(),

  weight: yup.number(),

  volume: yup.number(),

  count: yup.number(),

  description: yup.string(),

  url: yup
    .string()
    .url()
    .max(100),

  price: yup.number().required(),

  deliverable: yup.boolean().required(),
  categories: yup.array<number>().required()
});
