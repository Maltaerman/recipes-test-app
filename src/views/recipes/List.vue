<script lang="ts" setup>
import { ref, Ref, computed, watchEffect } from "vue";
import { useRecipesStore } from "@/store/recipes";
import { useRoute, useRouter } from "vue-router";
import Card from '@/components/recipes/ListInfoCard.vue';
import Table from "@/components/ui/Table.vue";
import Form from '@/components/recipes/RecipeForm.vue';
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton.vue";
import { useLoaderComposable } from "@/composable/useLoaderComposable";
import { getSrc } from '@/helpers/images';
import { storeToRefs } from 'pinia'

const route = useRoute();
const router = useRouter();

const { loaderVisibility,  showLoader, hideLoader } = useLoaderComposable();

const store = useRecipesStore();

const { recipes } = storeToRefs(store);

const viewModel: Ref<'table' | 'grid'> = ref('table');

const tableData = computed(() => ({
  headers: [
    { label: 'Title', value: 'title' },
    { label: 'Image', value: 'images' },
    { label: 'Category', value: 'category' },
    { label: 'Ingredient tags', value: 'ingredients' },
    { label: 'Small description', value: 'smallDescription' },
    { label: 'Actions', value: 'actions' },
   ],
  items: recipes.value.map((recipe) => ({
    ...recipe,
    actions: recipe.id,
  })),
}))

watchEffect(async () => {
  try {
    showLoader();
    await store.fetchRecipes(route.meta);
  } finally {
    hideLoader();
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <PrimaryButton
        text="Add"
          block
          :disabled="loaderVisibility"
          @click="router.push({ name: 'CreateRecipe' })"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <SecondaryButton
          :text="`View mode / ${viewModel}`"
          block
          :disabled="loaderVisibility"
          @click="viewModel = (viewModel === 'grid' ? 'table' : 'grid')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-divider />
      </v-col>
    </v-row>

    <Table
      v-if="viewModel === 'table'"
      :disabled="loaderVisibility"
      v-bind="tableData"
    >
      <template #images="{ item }">
        <div class="d-flex flex-wrap justify-start">
          <v-img
          v-for="(image, key) in item"
          :key="key"
          :src="getSrc(image)"
          class="ma-1"
          aspect-ratio="1"
          height="50"
        />
        </div>
      </template>
      <template #category="{ item }">
        <div class="d-flex flex-wrap">
          <v-chip
            v-for="category in item"
            :key="category"
            label
            class="ma-1"
            color="primary"
          >
          {{ category  }}
        </v-chip>
        </div>
      </template>
      <template #ingredients="{ item }">
        <div class="d-flex flex-wrap">
          <v-chip
            v-for="{ value, name } in item"
            :key="value"
            class="ma-1"
            label
            color="primary"
          >
          {{ name  }}
        </v-chip>
        </div>
      </template>
      <template #actions="{ item }">
        <div class="d-flex flex-column">
          <SecondaryButton
            text="Update"
            class="ma-1"
            @click="router.push({
              name: 'UpdateRecipe',
              params: { id: item }
            })"
          />
          <SecondaryButton
            text="View"
            class="ma-1"
            @click="router.push({
              name: 'Recipe',
              params: { id: item }
            })"
          />
          <SecondaryButton
            text="Quick view"
            class="ma-1"
          />
        </div>
      </template>
    </Table>

    <v-row v-if="viewModel === 'grid'">
      <v-col
        v-for="{ id, ...props } in recipes"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        :key="id"
      >
        <Card
          v-bind="props"
          :disabled="loaderVisibility"
          @update="router.push({
            name: 'UpdateRecipe',
            params: { id }
          })"
          @view="router.push({
            name: 'Recipe',
            params: { id }
          })"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
