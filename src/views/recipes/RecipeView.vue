<script lang="ts" setup>
import { ref, Ref, computed, watchEffect, inject } from "vue";
import { useRecipesStore } from "@/store/recipes";
import { useRoute, useRouter } from "vue-router";
import { getSrc } from '@/helpers/images';
import { useLoaderComposable } from "@/composable/useLoaderComposable";
import type { IRecipe } from "@/types/recipes";
const route = useRoute();
const router = useRouter();

const { showLoader, hideLoader } = useLoaderComposable();

const store = useRecipesStore();

const recipe: Ref<IRecipe | null> = ref(null)

watchEffect(async () => {
  try {
    showLoader();
    recipe.value = await store.fetchRecipe(route.params.id as string);
    if (!recipe.value?.id) {
      router.push({ name: 'Recipes' });
    }
  } finally {
    hideLoader();
  }
});
</script>

<template>
    <v-toolbar
      v-if="recipe"
      color="primary"
    >
    <v-toolbar-title :text="`Recipe / ${recipe.title}`" />

    <template v-slot:append>
      <v-btn
        icon="mdi-close"
        @click="router.push({ name: 'Recipes' })"
      />
    </template>
  </v-toolbar>

  <v-card
    v-if="recipe"
    flat
    class="mx-auto"
  >
    <template>
      <v-progress-linear
        color="deep-purple"
        height="5"
      />
    </template>

    <v-card-text>
      <v-carousel class="mb-2">
        <v-carousel-item
          v-for="(image, key) in recipe.images"
          :key="key"
          :src="getSrc(image)"
          cover
        />
      </v-carousel>

      {{ recipe.description }}
      <v-divider class="mt-2 mb-2" />
      {{ recipe.smallDescription }}
    </v-card-text>

    <v-card-subtitle>
      <span
        class="me-1"
        v-text="`Category / ${recipe.category[0]}`"
      />

      <v-icon
        color="error"
        icon="mdi-fire-circle"
        size="small"
      />
    </v-card-subtitle>

    <v-card-title v-text="'Ingredients:'" />

    <v-card-text>
      <v-chip
        v-for="{ id, name } in recipe.ingredients"
        :key="id"
        class="ma-1"
        label
        color="primary"
      >
        {{ name }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>