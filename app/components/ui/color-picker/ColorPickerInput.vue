<script setup lang="ts">
import { cn } from "~/lib/utils";
import { Input } from "../input";
import type { HTMLAttributes } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";
import { formatColor, parseColor, isValidColor } from "./color.utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
if (!context)
  throw new Error("ColorPickerInput must be used within ColorPickerRoot");

const { color, disabled, setColor, format } = context;

const localValue = ref("");
const isFocused = ref(false);

const currentFormat = computed(
  () => format.value as "hex" | "rgb" | "hsv" | "oklch",
);

// Sync FROM global TO local (Context -> UI)
watch(
  [() => color.value, currentFormat],
  ([newColor, newFmt]) => {
    if (isFocused.value) return;

    const formatted = formatColor(newColor, newFmt);
    if (formatted.toLowerCase() !== localValue.value.toLowerCase()) {
      localValue.value = formatted;
    }
  },
  { immediate: true, deep: true },
);

// Sync FROM local TO global (UI -> Context)
watch(localValue, (val) => {
  if (!isFocused.value) return;

  const fmt = currentFormat.value;
  if (isValidColor(val, fmt)) {
    const parsed = parseColor(val);
    if (parsed) {
      // Avoid redundant updates by checking standardized string equality
      const currentFormatted = formatColor(color.value, fmt);
      const newFormatted = formatColor(parsed, fmt);

      if (newFormatted.toLowerCase() !== currentFormatted.toLowerCase()) {
        setColor(parsed);
      }
    }
  }
});

const handleBlur = () => {
  isFocused.value = false;
  // Clean up on blur to ensure the input reflects the canonical global state
  localValue.value = formatColor(color.value, currentFormat.value);
};
</script>

<template>
  <Input
    v-model="localValue"
    :disabled="disabled"
    :aria-label="`${currentFormat.toUpperCase()} Color Value`"
    :class="cn('font-mono', props.class)"
    @focus="isFocused = true"
    @blur="handleBlur"
  />
</template>
