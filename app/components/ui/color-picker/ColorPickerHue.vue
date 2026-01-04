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
    class="h-10 w-full rounded bg-neutral-300 dark:bg-neutral-800 forced-colors:bg-[GrayText]"
    :class="cn(props.class)"
    :style="backgroundStyle"
  >
    <slot />
  </div>
</template>
