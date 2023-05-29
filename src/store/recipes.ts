import { ref, reactive, type Ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  fetchRecipes as fetch,
  fetchRecipe as fetchOne,
  createRecipe as create,
  updateRecipe as update,
  deleteRecipe as remove,
} from "@/api/recipesApi";
import type { IMeta } from "@/types/listing";
import type {
  IRecipe,
  IFetchRecipesPayload,
  ICreateRecipePayload,
  IUpdateRecipePayload,
} from "@/types/recipes";

export interface IStore {
  recipes: Ref<IRecipe[]>;
  meta: Ref<IMeta>;
  fetchRecipes: (payload?: IFetchRecipesPayload) => Promise<void>;
  fetchRecipe: (payload: string) => Promise<IRecipe>;
  createRecipe: (payload: ICreateRecipePayload) => Promise<void>;
  updateRecipe: (payload: IUpdateRecipePayload) => Promise<void>;
  deleteRecipe: (payload: string) => Promise<void>;
}

export const useRecipesStore = defineStore("recipes", (): IStore => {
  const recipes = ref([]);
  const meta = ref({ currentPage: 1, lastPage: 1 });

  async function fetchRecipes(payload: IFetchRecipesPayload) {
    const { data, meta } = await fetch(payload);
    recipes.value = data;
    meta.value = meta;
  }

  async function fetchRecipe(id: string) {
    return await fetchOne(id);
  }

  async function createRecipe(payload: ICreateRecipePayload) {
    await create(payload);
  }

  async function updateRecipe(payload: IUpdateRecipePayload) {
    return await update(payload);
  }

  async function deleteRecipe(id: string) {
    await remove(id);
  }

  return {
    recipes,
    meta,
    fetchRecipes,
    fetchRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
});
