<script lang="ts" setup>
import { computed } from "vue";

export interface IProps {
  readonly itemTitle?: string;
  readonly itemValue?: string;
  readonly returnObject?: boolean;
  readonly items?: any[];
  readonly label?: string;
  readonly errors?: string[];
  readonly modelValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  itemTitle: '',
  itemValue: '',
  returnObject: true,
  items: (): string[] => [],
  label: '',
  errors: (): string[] => [],
  modelValue: '',
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const model = computed({
  get: (): string => props.modelValue,
  set: (value: string): void => emits("update:modelValue", value),
});
</script>

<template>  
  <v-select
    v-model="model"
    v-bind="props"
  />
</template>
