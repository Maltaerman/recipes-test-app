import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/recipes',
    name: 'Recipes',
    alias: "/",
    component: () => import('@/views/recipes/List.vue'),
  },
  {
    path: '/recipes/create',
    name: 'CreateRecipe',
    component: () => import('@/views/recipes/Create.vue'),
  },
  {
    path: '/recipes/update/:id',
    name: 'UpdateRecipe',
    component: () => import('@/views/recipes/Update.vue'),
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: () => import('@/views/recipes/RecipeView.vue'),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "Recipes",
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
