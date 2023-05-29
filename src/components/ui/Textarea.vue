<script lang="ts" setup>
import { computed } from "vue";

export interface IProps {
  readonly modelValue: string;
  readonly disabled: boolean;
  readonly placeholder: string;
  readonly errors: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  disabled: false,
  placeholder: '',
  errors: (): string[] => [],
});

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const model = computed({
  get: (): string => props.modelValue,
  set: (value: string): void => emits("update:modelValue", value),
});
</script>

<template>
  <v-textarea
    v-model="model"
    v-bind="props"
  />
</template>
