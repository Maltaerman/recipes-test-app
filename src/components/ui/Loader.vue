<script lang="ts" setup>
import { useLoaderComposable } from "@/composable/useLoaderComposable";

const { loaderVisibility } = useLoaderComposable();
</script>

<template>
  <v-progress-circular
    v-if="loaderVisibility"
    indeterminate
    size="45"
    style="position: absolute; top: 50%; left: 50%"
    color="primary"
  />
  <slot />
</template>
