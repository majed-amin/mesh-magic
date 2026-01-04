<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const colorPickerContext = inject<ColorPickerContext>(COLOR_PICKER_KEY);
const previewColor = computed(() => colorPickerContext?.previewColor.value);

const backgroundStyle = computed(() => ({
  backgroundColor: previewColor.value?.hex || "#ff0000",
  backgroundImage: `
    linear-gradient(to top, #000, transparent),
    linear-gradient(to right, #fff, transparent)
  `,
}));
</script>

<template>
  <div
    class="h-full w-full aspect-square rounded-lg bg-neutral-300 dark:bg-neutral-800 forced-colors:bg-[GrayText]"
    :class="cn(props.class)"
    :style="backgroundStyle"
  >
    <slot />
  </div>
</template>
