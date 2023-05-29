<script lang="ts" setup>
import { computed } from "vue";

export interface IHeader {
  readonly value: string;
  readonly label: string;
}

export interface IProps {
  readonly items: [];
  readonly headers: IHeader[];
}

const props = withDefaults(defineProps<IProps>(), {
  items: () => [],
  headers: (): IHeader[] => [],
});

const emits = defineEmits();
</script>

<template>
 <v-table>
    <thead>
      <tr>
        <th
          v-for="{ value, label } in headers"
          :key="value"
          class="text-left"
          v-text="label"
        />
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(item, key) in items"
      :key="key"
      >
        <td
          v-for="(subitem, name) in item"
          :key="name"
          v-show="headers.find(({ value }) => value === name)"
        >
          <slot
            :name="name"
            :index="key"
            :item="subitem"
          >
            {{ subitem }}
          </slot>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
