<template>  
  <v-toolbar color="primary">
    <v-toolbar-title text="Update recipe" />

    <template v-slot:append>
      <v-btn
        icon="mdi-close"
        @click="close"
      />
    </template>
  </v-toolbar>

  <Form
    v-bind="{ 
      disabled: loaderVisibility,
      ingredients: ingredients?.data || [],
      showDeleteButton: true,
      value,
    }"
    @submit="updateRecipe"
    @delete="deleteRecipe"
    @cancel="close"
  />
</template>
    
<script lang="ts" setup>
import { ref, Ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecipesStore } from "@/store/recipes";
import { useIngredientsStore } from "@/store/ingredients";
import { useLoaderComposable } from "@/composable/useLoaderComposable";
import Form, { type IFormData } from '@/components/recipes/RecipeForm.vue';
import { fetchIngredients } from "@/api/ingredientsApi";
import type { IRecipe } from "@/types/recipes";

const route = useRoute();
const router = useRouter();
  
const store = useRecipesStore();
const { ingredients } = useIngredientsStore();
const { loaderVisibility,  showLoader, hideLoader } = useLoaderComposable();
  
const value: Ref<IFormData | null> = ref(null)

watchEffect(async () => {
  try {
    showLoader();
    await fetchIngredients();
  } finally {
    hideLoader();
  }
});

watchEffect(async () => {
  try {
    showLoader();
    value.value = await store.fetchRecipe(route.params.id as string);
    if (!value.value?.id) {
      router.push({ name: 'Recipes' });
    }
  } finally {
    hideLoader();
  }
});

async function updateRecipe(formData: IFormData) {
  try {
    showLoader();
    await store.updateRecipe({
      id: route.params.id,
      ...formData,
    });
    router.push({ name: 'Recipes' });
  } finally {
    hideLoader();
  }
}

async function deleteRecipe(id: string) {
  try {
    showLoader();
    await store.deleteRecipe(id);
    router.push({ name: 'Recipes' });
  } finally {
    hideLoader();
  }
}

function close() {
  router.push({ name: 'Recipes' })
}
</script>
      