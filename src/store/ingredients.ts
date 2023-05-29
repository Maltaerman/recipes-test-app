import { ref, reactive, type Ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchIngredients as fetch } from "@/api/ingredientsApi";
import type { IListing } from "@/types/listing";
import type { IIngredient } from "@/types/ingredients";

export interface IStore {
  ingredients: IListing<IIngredient>;
  fetchIngredients: () => Promise<void>;
}

export const useIngredientsStore = defineStore("ingredients", (): IStore => {
  const ingredients: IListing<IIngredient> = reactive({
    data: [],
    meta: {
      currentPage: 1,
      lastPage: 1,
    }
  });

  async function fetchIngredients() {
    const { data, meta } = await fetch();
    ingredients.data = data;
    ingredients.meta = meta;
  }

  return {
    ingredients,
    fetchIngredients,
  };
});
