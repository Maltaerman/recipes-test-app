<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import { useRouter } from "vue-router";
import SecondaryButton from '@/components/ui/buttons/SecondaryButton.vue';
import { getSrc } from '@/helpers/images';
import type { IIngredient } from '@/types/ingredients';
import type { TCategory } from '@/types/recipes'

const router = useRouter();

const show = ref(false);

export interface IProps {
  readonly title: string;
  readonly images: (string | File)[];
  readonly category: TCategory[];
  readonly ingredients: IIngredient[];
  readonly smallDescription: string;
  readonly loading: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  images: () => [],
  category: (): TCategory[] => [],
  ingredients: (): IIngredient[] => [],
  smallDescription: '',
  loading: false,
});

const ingredientsToDisplay: Ref<IIngredient[]> = computed(() => show.value ?
  props.ingredients : props.ingredients.filter((_, key) => key < 5));

const emits = defineEmits();
</script>
  
<template>
  <v-card>
    <v-img
      :src="getSrc(images[0])"
      height="200px"
      cover
    >
      <v-chip
        v-if="images.length > 1"
        style="position: absolute; bottom: 0; right: 0;"
        class="pa-2 ma-1 bg-white"
      >
        {{ `+ ${images.length - 1} more images` }}
      </v-chip>
    </v-img>

    <v-card-title>
      {{  title  }}
    </v-card-title>

    <v-card-subtitle>
      {{ category[0]  }}
    </v-card-subtitle>

    <v-card-actions class="d-flex flex-wrap">
      <v-chip
        v-for="{ id, name } in ingredientsToDisplay"
        :key="id"
        class="pa-2 ma-1 bg-white"
      >
        {{ name }}
      </v-chip>
      <v-chip
        v-if="ingredients.length > 5"
        :text="`Show ${show ? 'less' : 'more'}`"
        class="bg-primary"
        @click="show = !show"
      />
    </v-card-actions>

    <v-card-text>
      {{ smallDescription }}
    </v-card-text>

    <v-card-actions class="d-flex flex-column">
      <SecondaryButton
        text="Update"
        block
        class="ma-1"
        @click="emits('update')"
      />
      <SecondaryButton
        text="Quick view"
        block
        class="ma-1"
        @click="emits('quick-view')"
      />
      <SecondaryButton
        text="View"
        block
        class="ma-1"
        @click="emits('view')"
      />
    </v-card-actions>
  </v-card>
</template>
  