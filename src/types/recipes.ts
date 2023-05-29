import type { IIngredient } from './ingredients'

export type TCategory = 'Italian' | 'Greek' | 'Japanese';

export interface IRecipe {
  readonly id: string;
  readonly title: string;
  readonly images: (string | File)[];
  readonly category: TCategory[];
  readonly ingredients: IIngredient[];
  readonly description: string;
  readonly smallDescription: string;
  readonly quantity: number;
}

export interface IFetchRecipesPayload {
  readonly page?: number;
  readonly perPage?: number;
}

export interface ICreateRecipePayload {
  readonly title: string;
  readonly images: (string | File)[];
  readonly category: TCategory[];
  readonly ingredients: IIngredient[];
  readonly description: string;
  readonly smallDescription: string;
  readonly quantity: number;
}

export interface IUpdateRecipePayload {
  readonly id: string;
  readonly title: string;
  readonly images: (string | File)[];
  readonly category: TCategory[];
  readonly ingredients: IIngredient[];
  readonly description: string;
  readonly smallDescription: string;
  readonly quantity: number;
}
