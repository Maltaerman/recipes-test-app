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
    class="text-none"
    color="grey-lighten-3"
    variant="flat"
    v-bind="props"
  />
</template>
