<script setup lang="ts">
import { cn } from "~/lib/utils";
import { inject, computed, type HTMLAttributes } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";

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

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
if (!context)
  throw new Error("ColorPickerAlpha must be used within ColorPickerRoot");

const { color } = context;

const backgroundStyle = computed(() => {
  const { r, g, b } = color.value.rgb;
  const colorStr = `rgb(${r}, ${g}, ${b})`;
  const direction =
    props.orientation === "horizontal" ? "to right" : "to bottom";

  return {
    backgroundImage: `linear-gradient(${direction}, transparent, ${colorStr}), 
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><rect width="8" height="8" fill="white"/><rect width="4" height="4" fill="rgb(230,230,230)"/><rect x="4" y="4" width="4" height="4" fill="rgb(230,230,230)"/></svg>')`,
    backgroundSize: `100% 100%, 8px 8px`,
    backgroundRepeat: `no-repeat, repeat`,
  };
});
</script>

<template>
  <div
    :class="cn('w-full rounded relative overflow-hidden', props.class)"
    :style="backgroundStyle"
  >
    <slot />
  </div>
</template>
