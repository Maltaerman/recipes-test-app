<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    showErrors: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Array as () => string[],
      default: (): string[] => [],
    },
  },
  data: () => ({
    model: null,
    isValidFormat: true,
    availableFormats: ["image/gif", "image/jpeg", "image/svg+xml", "image/png"],
  }),
  emits: ["update:modelValue"],
  methods: {
    chooseImage() {
      document.getElementById("image-picker").click();
    },
    setImage(files: any): void {
      if (files && files[0]) {
        this.isValidFormat = this.availableFormats.some(
          (format: string): boolean => format === files[0]?.type
        );
      }
      if (this.isValidFormat) {
        this.model = files[0];
        this.$emit("update:modelValue", this.model);
      } else {
        this.model = null;
        this.$emit("update:modelValue", this.model);
      }
    },
  },
});
</script>

<template>
  <div
    class="border bortder-2 border-dashed h-100 w-100 d-flex items-center justify-center"
    style="position: relative;"
  >
    <input
      id="image-picker"
      type="file"
      class="file-input border bortder-2 border-dashed p-2 w-100"
      @change="(event) => setImage(event.target.files)"
    />
    <slot>
      <p class="pa-2">
        Drag the file or
        <span class="text-primary-400">choose from your pc</span>
      </p>
    </slot>
  </div>
</template>

<style scoped>
.file-input {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
</style>
