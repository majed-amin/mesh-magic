<script setup lang="ts">
import {
  ColorPickerRoot,
  ColorPickerBody,
  ColorPickerHeader,
  ColorPickerPreview,
  ColorPickerSaturation,
} from ".";
import type { ColorValue } from "./types";
import { Color, parseColor } from "./color.utils";

const test = new Color("green");
const color = ref<ColorValue>(parseColor(test));
</script>

<template>
  <ColorPickerRoot :color>
    <ColorPickerPreview />
    <ColorPickerBody>
      <ColorPickerHeader>
        <ColorPickerSaturation />
      </ColorPickerHeader>

      <!-- </ColorPickerHeader> -->
    </ColorPickerBody>
    <!-- <ColorPickerSwatches />
      <ColorPickerSaturation />



      <ColorPickerHue />
      <ColorPickerAlpha />
      <ColorPickerInputs /> -->
  </ColorPickerRoot>
</template>
