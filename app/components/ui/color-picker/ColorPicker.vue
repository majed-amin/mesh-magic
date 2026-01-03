<script setup lang="ts">
import {
  ColorPickerRoot,
  ColorPickerBody,
  ColorPickerHeader,
  ColorPickerPreview,
  ColorPickerSaturation,
  ColorPickerHue,
} from ".";
import type { ColorValue } from "./types";
import { Color, parseColor } from "./color.utils";

const test = new Color("green");
const color = ref<ColorValue>(parseColor(test));
</script>

<template>
  <ColorPickerRoot v-model="color">
    <ColorPickerPreview />
    <ColorPickerBody>
      <ColorPickerHeader>
        <ColorPickerSaturation />
        <ColorPickerHue />
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
