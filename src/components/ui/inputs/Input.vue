<script lang="ts" setup>
import { computed } from "vue";

export type TInputType = "text" | "email" | "date";

export interface IProps {
  readonly type?: TInputType;
  readonly disabled?: boolean;
  readonly modelValue?: string;
  readonly errors?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  type: "text",
  disabled: false,
  modelValue: "",
  errors: (): string[] => [],
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
  <v-text-field
    v-model="model"
    v-bind="props"
  />
</template>
