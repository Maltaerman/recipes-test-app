import type { IIngredient } from "@/types/ingredients";
import type { IListing } from "@/types/listing";
  
/** Fake ingredients */
const data: IListing<IIngredient> = {
  data: [
    {
      id: 'ingredients-827491',
      name: 'Flour',
    },
    {
      id: 'ingredients-209753',
      name: 'Salt',
    },
    {
      id: 'ingredients-673912',
      name: 'Eggs',
    },
    {
      id: 'ingredients-148275',
      name: 'Sugar',
    },
    {
      id: 'ingredients-519846',
      name: 'Milk',
    },
    {
      id: 'ingredients-784123',
      name: 'Baking powder',
    },
    {
      id: 'ingredients-435297',
      name: 'Vanilla extract',
    },
    {
      id: 'ingredients-926534',
      name: 'Lemon zest',
    },
  ],
  meta: {
    currentPage: 1,
    lastPage: 1,
  },
};

/** Base CRUD imitation  */

export async function fetchIngredients(): Promise<IListing<IIngredient>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), 1000)
  );
}
