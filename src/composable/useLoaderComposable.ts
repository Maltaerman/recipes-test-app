import { ref } from "vue";

const loaderVisibility = ref(false);

const useLoaderComposable = () => ({
  loaderVisibility,
  showLoader: () => loaderVisibility.value = true,
  hideLoader: () => loaderVisibility.value = false,
})

export { useLoaderComposable };
