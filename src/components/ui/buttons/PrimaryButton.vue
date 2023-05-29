<script lang="ts" setup>
import type { IProps  } from '@/types/components/ui/buttons';

withDefaults(defineProps<IProps>(), {
  label: '',
  type: "button",
  disabled: false,
});
</script>

<template>
  <v-btn
    class="text-none text-white"
    color="blue-darken-4"
    rounded="0"
    variant="flat"
    v-bind="props"
  />
</template>
