<script setup lang="ts">
import "vue-sonner/style.css";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
onBeforeMount(() => {
  useGSAP().registerPlugin(MorphSVGPlugin);
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toaster />
</template>
