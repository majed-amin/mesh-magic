<script setup lang="ts">
import { cn } from "~/lib/utils";
import { Input } from "../input";
import type { HTMLAttributes } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";
import { isHexColorValid, parseColor } from "./color.utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
if (!context)
  throw new Error("ColorPickerInput must be used within ColorPickerRoot");

const { color, disabled, setColor } = context;

const localHex = ref("");

// Sync local hex when context color changes
watch(
  () => color.value.hex,
  (newHex) => {
    if (newHex.toLowerCase() !== localHex.value.toLowerCase()) {
      localHex.value = newHex;
    }
  },
  { immediate: true },
);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  localHex.value = value;
  if (isHexColorValid(value)) {
    if (value.toLowerCase() !== color.value.hex.toLowerCase()) {
      setColor(parseColor(value));
    }
  }
};
</script>

<template>
  <Input
    :value="localHex"
    :disabled="disabled"
    :class="cn('font-mono', props.class)"
    @input="handleInput"
  />
</template>
