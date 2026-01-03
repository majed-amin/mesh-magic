<script setup lang="ts">
import { PopoverTrigger } from "../popover";
import {
  COLOR_PICKER_KEY,
  type ColorPickerContext,
  type ColorValue,
} from "./types";
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";
import { parseColor } from "./color.utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const color = inject<ColorPickerContext>(COLOR_PICKER_KEY)
  ?.color as Ref<ColorValue>;

const hex = computed<ColorValue>(() => {
  return parseColor(color.value?.hex || "#000000");
});

onMounted(() => {
  const root = document.documentElement;
  root.style.setProperty("--c-picker-preview", hex.value.hex);
});
watch(color, () => {
  const root = document.documentElement;
  root.style.setProperty("--c-picker-preview", hex.value.hex);
});
</script>

<template>
  <PopoverTrigger as-child>
    <Button
      aria-label="Select Color"
      :class="cn('size-10 p-0 rounded-md', props.class)"
      style="background-color: var(--c-picker-preview)"
    />
  </PopoverTrigger>
</template>
