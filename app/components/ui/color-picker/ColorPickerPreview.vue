<script setup lang="ts">
import { PopoverTrigger } from "../popover";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
if (!context)
  throw new Error("ColorPickerPreview must be used within ColorPickerRoot");

const { color, disabled } = context;

const hex = computed(() => {
  return color.value.hex || "#000000";
});
</script>

<template>
  <PopoverTrigger as-child :disabled="disabled">
    <Button
      aria-label="Select Color"
      variant="outline"
      :disabled="disabled"
      :class="
        cn(
          'size-9 p-0 border shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden rounded-md',
          props.class,
        )
      "
    >
      <div class="h-full w-full" :style="{ backgroundColor: hex }" />
    </Button>
  </PopoverTrigger>
</template>
