<script lang="ts" setup>
import { defineComponent } from "vue";
// import GlobalAlerts from "@/components/ui/GlobalAlerts.vue";
import Loader from "@/components/ui/Loader.vue";
import RouteLayout from "@/layouts/RouteLayout.vue";
</script>

<template>
  <v-app>

  <!-- <v-app-bar color="surface-variant" title="Recipes"></v-app-bar>
  <v-navigation-drawer color="surface">
    <v-list>
      <v-list-item title="Drawer left"></v-list-item>
    </v-list>
  </v-navigation-drawer> -->

    <v-main>
      <Loader>
        <router-view />
      </Loader>
    </v-main>
  </v-app>
</template>
