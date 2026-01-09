<script setup lang="ts">
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
</template>
