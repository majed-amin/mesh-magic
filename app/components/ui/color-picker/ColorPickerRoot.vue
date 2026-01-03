<script setup lang="ts">
import { Popover } from "../popover";
import { parseColor } from "./color.utils";

import {
  COLOR_PICKER_KEY,
  type ColorPickerContext,
  type ColorValue,
} from "./types";

const props = withDefaults(
  defineProps<{
    color?: ColorValue;
  }>(),
  {
    color: () => parseColor("#000"),
  },
);
const colorRef = toRef(props.color);
const colorPreviewRef = toRef(props.color);
provide<ColorPickerContext>(COLOR_PICKER_KEY, {
  color: colorRef,
  previewColor: colorPreviewRef,
  emitColorChange: (newColor: ColorValue) => {
    console.log("[ROOT]: Color changed to:", newColor);
  },
  setColor: (newColor: ColorValue) => {
    console.log("[ROOT]: Set color to:", newColor);
    colorRef.value = newColor;
  },
});
</script>

<template>
  <section class="p-4 flex flex-col gap-4">
    <Popover as-child>
      <slot />
    </Popover>
  </section>
</template>
