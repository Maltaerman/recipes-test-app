import type {
  IRecipe,
  IFetchRecipesPayload,
  ICreateRecipePayload,
  IUpdateRecipePayload,
} from "@/types/recipes";
import type { IListing } from "@/types/listing";

/** Fake recipes */
const data: IListing<IRecipe> = {
  data: [
    {
      id: "recipe-221441",
      title: 'Chocolate Chip Cookies',
      images: [
        'https://static01.nyt.com/images/2022/02/12/dining/JT-Chocolate-Chip-Cookies/JT-Chocolate-Chip-Cookies-master768.jpg',
        'https://img.taste.com.au/y3MeH6zH/taste/2016/11/chocolate-chip-cookies-23196-1.jpeg',
      ],
      category: [ 'Italian' ],
      ingredients: [
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
      ],
      description: "Delicious homemade chocolate chip cookies that are soft and chewy.",
      smallDescription: "Soft and chewy chocolate chip cookies.",
      quantity: 12
    },
    {
      id: "recipe-421141",
      title: 'Berry Smoothie',
      images: [
        'https://simple-veganista.com/wp-content/uploads/2017/07/mixed-berry-yogurt-smoothie-2.jpg',
      ],
      category: [ 'Italian' ],
      ingredients: [
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
      description: 'This refreshing berry smoothie is a perfect way to start your day or enjoy as a healthy snack.',
      smallDescription: 'Enjoy the vibrant flavors and health benefits of this fruity beverage!',
      quantity: 2,
    },
  ],
  meta: {
    currentPage: 1,
    lastPage: 1,
  },
};

/** Base CRUD imitation  */

export async function fetchRecipes(payload?: IFetchRecipesPayload): Promise<IListing<IRecipe>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), 1000)
  );
}

export function fetchRecipe(payload: string): Promise<IRecipe> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const recipe: IRecipe = data.data.find(({ id }) => id === payload) as IRecipe;
      resolve(recipe);
    }, 1000)
  );
}

export function createRecipe(payload: ICreateRecipePayload): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      data.data.push({
        id: `recipe-${new Date().valueOf()}-id`,
        ...payload,
      });
      resolve();
    }, 1000)
  );
}

export function updateRecipe(payload: IUpdateRecipePayload): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index: number = data.data.findIndex(({ id }) => id === payload.id);
      data.data[index] = payload;
      resolve();
    }, 1000)
  );
}

export function deleteRecipe(payload: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const index: number = data.data.findIndex(({ id }) => id === payload);
      data.data.splice(index, 1);
      resolve();
    }, 1000)
  );
}