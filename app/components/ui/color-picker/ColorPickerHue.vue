<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    class: "",
    orientation: "horizontal",
  },
);

const backgroundStyle = computed(() => ({
  background: `linear-gradient(${
    props.orientation === "horizontal" ? "to right" : "to bottom"
  }, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`,
}));
</script>

<template>
  <div
    :class="cn('w-full rounded relative overflow-hidden', props.class)"
    :style="backgroundStyle"
  >
    <slot />
  </div>
</template>
