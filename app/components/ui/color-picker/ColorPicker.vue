<script setup lang="ts">
import {
  ColorPickerRoot,
  ColorPickerBody,
  ColorPickerPreview,
  ColorPickerSaturation,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerArea,
  ColorPickerIndicator,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerSwatch,
  ColorPickerSection,
  ColorPickerRow,
} from ".";
import type { ColorValue, ColorPickerProps } from "./types";

const props = defineProps<ColorPickerProps>();
const modelValue = defineModel<ColorValue | string>();
const open = defineModel<boolean>("open", { default: false });

const emit = defineEmits<{
  (e: "change", value: ColorValue): void;
}>();
</script>

<template>
  <ColorPickerRoot
    v-bind="props"
    v-model="modelValue"
    v-model:open="open"
    @change="(val) => emit('change', val)"
    v-slot="{
      hsv,
      color: selectedColor,
      previewColor,
      setHsv,
      format: currentFormat,
    }"
  >
    <ColorPickerPreview />
    <ColorPickerBody>
      <ColorPickerSaturation class="overflow-hidden mb-2">
        <ColorPickerArea @change="({ x, y }) => setHsv({ s: x, v: 1 - y })">
          <ColorPickerIndicator
            :left="hsv.s * 100"
            :top="(1 - hsv.v) * 100"
            :color="selectedColor.hex"
            class="size-4"
          />
        </ColorPickerArea>
      </ColorPickerSaturation>

      <ColorPickerSection class="gap-4">
        <!-- Hue Slider -->
        <ColorPickerSection>
          <ColorPickerRow class="justify-between px-0.5">
            <ColorPickerLabel>Hue</ColorPickerLabel>
            <ColorPickerLabel class="font-mono normal-case">
              {{ Math.round(hsv.h) }}°
            </ColorPickerLabel>
          </ColorPickerRow>
          <ColorPickerHue orientation="horizontal" class="h-3 rounded-full">
            <ColorPickerArea @change="({ x }) => setHsv({ h: x * 360 })">
              <ColorPickerIndicator
                :left="(hsv.h / 360) * 100"
                :top="50"
                :color="previewColor.hex"
                class="size-4"
              />
            </ColorPickerArea>
          </ColorPickerHue>
        </ColorPickerSection>

        <!-- Alpha Slider -->
        <ColorPickerSection v-if="!props.disableAlpha">
          <ColorPickerRow class="justify-between px-0.5">
            <ColorPickerLabel>Alpha</ColorPickerLabel>
            <ColorPickerLabel class="font-mono normal-case">
              {{ Math.round(hsv.a * 100) }}%
            </ColorPickerLabel>
          </ColorPickerRow>
          <ColorPickerAlpha orientation="horizontal" class="h-3 rounded-full">
            <ColorPickerArea @change="({ x }) => setHsv({ a: x })">
              <ColorPickerIndicator
                :left="hsv.a * 100"
                :top="50"
                :color="selectedColor.hex"
                class="size-4"
              />
            </ColorPickerArea>
          </ColorPickerAlpha>
        </ColorPickerSection>

        <!-- Input Section -->
        <ColorPickerSection>
          <ColorPickerLabel>{{ currentFormat }}</ColorPickerLabel>
          <ColorPickerRow>
            <ColorPickerSwatch />
            <ColorPickerInput />
          </ColorPickerRow>
        </ColorPickerSection>
      </ColorPickerSection>

      <!-- <slot name="extra" v-bind="{ hsv, color: selectedColor }" /> -->
    </ColorPickerBody>
  </ColorPickerRoot>
</template>
