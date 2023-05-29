<script lang="ts" setup>
import { ref, type Ref, computed, defineComponent, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { cloneDeep } from "lodash";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton.vue";
import Input from "@/components/ui/inputs/Input.vue";
import Select from "@/components/ui/Select.vue";
import { getSrc } from '@/helpers/images';

import Textarea from "@/components/ui/Textarea.vue";
import ImagePicker from "@/components/ui/ImagePicker.vue";
import { useTasksStore } from "@/stores/tasks";

import type { IIngredient } from "@/types/ingredients";


export interface IFormData {
  title: string;
  smallDescription: string;
  description: string;
  ingredients: IIngredient[];
  images: (string | File)[];
}

export interface IErrors {
  title: string[];
  smallDescription: string[];
  description: string[];
  ingredients: IIngredient[];
  images: string[];
}

export interface IProps {
  readonly value?: IFormData;
  readonly ingredients?: IIngredient[]; 
  readonly disabled?: boolean;
  readonly showDeleteButton?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});

const formData: Ref<IFormData> = ref({
  title: "",
  smallDescription: '',
  description: "",
  ingredients: [],
  images: [],
});

const emits = defineEmits<{ (e: "submit", value: IFormData): void }>();

const errors = ref({
  title: [],
  description: [],
  images: [],
});

function submit() {
  emits("submit", formData.value);
}

watchEffect(() => {
  if (props.value) {
    formData.value = cloneDeep(props.value);
  }
});
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <Input
            v-model="formData.title"
            v-bind="{
              label: 'Title',
              errors: errors.title,
            }"
            class="col-start-1 col-end-7"
          />
        </v-col>

        <v-col
          cols="12"
          md="5"
          lg="4"
        >
          <Textarea
            v-model="formData.smallDescription"
            v-bind="{
              label: 'Small description',
              errors: errors.smallDescription,
            }"
            class="col-start-1 col-end-7"
          />
      
        </v-col>

        <v-col
          cols="12"
          md="7"
          lg="8"
        >
        <Textarea
          v-model="formData.description"
          v-bind="{
            label: 'Description',
            errors: errors.description,
          }"
          class="col-start-1 col-end-7"
        />
        </v-col>

        <v-col cols="12">
          <Select
            v-model="formData.ingredients"
            :items="ingredients"
            item-title="name"
            item-value="id"
            multiple
            return-object
          />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <ImagePicker
                v-if="formData.images"
                class="d-flex justify-center align-center pa-4"
                @update:modelValue="(image) => formData.images.push(image)"
              />
            </v-col>
            <v-col
            v-for="(image, key) in formData.images"
              :key="key"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
            <v-img :src="getSrc(formData.images[key])">
                <v-btn
                  icon="mdi-delete"
                  size="sm"
                  type="button"
                  class="ma-2 absolute"
                  @click="formData.images.splice(key, 1)"
                />
              </v-img>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          v-if="showDeleteButton"
          cols="12"
          sm="4"
        >
          <SecondaryButton
            text="Delete"
            block
            v-bind="{ disabled }"
            @click="emits('delete')"
          />
        </v-col>
        <v-col
          cols="12"
          :sm="showDeleteButton ? 8 : 12"
        >
        <PrimaryButton
          :text="showDeleteButton ? 'Update' : 'Create'"
          block
          v-bind="{ disabled }"
          type="submit"
        />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
