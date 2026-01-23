<script setup lang="ts">
import MeshGradientPreview from "~/components/mesh/MeshGradientPreview.vue";

const { loadFromUrl } = useMeshGradient();
const route = useRoute();

// Load gradient from URL on mount
onMounted(() => {
  const encoded = route.query.g as string;
  if (encoded) {
    loadFromUrl(encoded);
  }
});
</script>
<template>
  <MeshGradientPreview />
</template>
