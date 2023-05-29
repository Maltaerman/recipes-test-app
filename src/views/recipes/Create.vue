<template>
    <v-toolbar color="primary">
    <v-toolbar-title text="Create recipe" />

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
    }"
    @submit="createRecipe"
    @delete="deleteRecipe"
    @cancel="close"
  />
</template>
  
<script lang="ts" setup>
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useRecipesStore } from "@/store/recipes";
import { useIngredientsStore } from "@/store/ingredients";
import { useLoaderComposable } from "@/composable/useLoaderComposable";
import Form, { type IFormData } from '@/components/recipes/RecipeForm.vue';

const router = useRouter();

const store = useRecipesStore();

const { ingredients, fetchIngredients } = useIngredientsStore();

const { loaderVisibility,  showLoader, hideLoader } = useLoaderComposable();

watchEffect(async () => {
  try {
    showLoader();
    await fetchIngredients();
  } finally {
    hideLoader();
  }
});

async function deleteRecipe(id: string) {
  try {
    showLoader();
    await store.deleteRecipe(id);
  } finally {
    hideLoader();
  }
}

async function createRecipe(formData: IFormData) {
  try {
    showLoader();
    await store.createRecipe(formData);
    router.push({ name: "Recipes" });
  } finally {
    hideLoader();
  }
}

function close() {
  router.push({ name: 'Recipes' })
}
</script>
    