<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";
import { parseColor } from "./color.utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const colorPickerContext = inject<ColorPickerContext>(COLOR_PICKER_KEY);
const currentColor = computed(() => colorPickerContext?.color.value);
const previewColor = computed(() => colorPickerContext?.previewColor.value);

const hueHex = computed(() => previewColor.value?.hex);
const backgroundStyle = computed(() => ({
  background: `
       linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)),
       linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)),
       ${hueHex.value}
     `,
}));

const indicatorPos = computed(() => {
  const hsv = currentColor.value?.hsv;
  if (!hsv) return { left: "50%", top: "50%" };
  const s = Math.max(0, Math.min(1, hsv.s ?? 0));
  const v = Math.max(0, Math.min(1, hsv.v ?? 0));
  return {
    left: `${s * 100}%`,
    top: `${(1 - v) * 100}%`, // invert so v=1 is top
  };
});

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
const { elementX, elementY, elementWidth, elementHeight, isOutside } =
  useMouseInElement(containerRef);
const isDragging = ref(false);
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const updateColorFromPosition = () => {
  if (!colorPickerContext) return;
  if (!currentColor.value) return;
  if (isOutside.value) return;
  const w = elementWidth.value ?? 0;
  const h = elementHeight.value ?? 0;
  if (!w || !h) return;

  // Use raw element coords but clamp inside the element bounds
  const x = clamp(elementX.value, 0, w);
  const y = clamp(elementY.value, 0, h);

  const s = clamp(x / w, 0, 1);
  const v = clamp(1 - y / h, 0, 1);

  const hue = currentColor.value.hsv?.h ?? 0;
  const alpha = currentColor.value.hsv?.a ?? 1;

  // Create an HSV object and parse into ColorValue
  const newColorValue = parseColor({ h: hue, s, v, a: alpha });
  colorPickerContext.setColor(newColorValue);
};

const onPointerDown = (e?: PointerEvent) => {
  isDragging.value = true;
  updateColorFromPosition();
  if (containerRef.value && e && (e.target as Element).setPointerCapture) {
    (e.target as Element).setPointerCapture((e as PointerEvent).pointerId);
  }
};
const onPointerUp = (e?: PointerEvent) => {
  isDragging.value = false;
  if (containerRef.value && e && (e.target as Element).releasePointerCapture) {
    (e.target as Element).releasePointerCapture((e as PointerEvent).pointerId);
  }
};

useEventListener(window, "pointermove", () => {
  if (!isDragging.value) return;
  updateColorFromPosition();
});
useEventListener(window, "pointerup", onPointerUp);
</script>

<template>
  <div
    ref="containerRef"
    class="relative h-full cursor-crosshair overflow-hidden w-full aspect-square rounded-lg bg-neutral-300 dark:bg-neutral-800 forced-colors:bg-[GrayText]"
    :class="cn(props.class)"
    :style="backgroundStyle"
    @pointerdown="onPointerDown"
  >
    <div
      role="presentation"
      class="absolute -translate-x-1/2 -translate-y-1/2 size-4.5 rounded-full border-2 border-white box-border"
      :style="{
        left: indicatorPos.left,
        top: indicatorPos.top,
        backgroundColor: currentColor?.hex,
        touchAction: 'none',
        forcedColorAdjust: 'none',
        boxShadow: 'black 0px 0px 0px 1px, black 0px 0px 0px 1px inset',
      }"
    />
  </div>
</template>
