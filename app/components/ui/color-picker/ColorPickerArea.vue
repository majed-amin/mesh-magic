<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    x?: number; // Current normalized X (0-1)
    y?: number; // Current normalized Y (0-1)
    step?: number;
    shiftStep?: number;
    label?: string;
    ariaValueText?: string;
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    class: "",
    x: 0,
    y: 0,
    step: 0.01,
    shiftStep: 0.1,
    label: "Color picker area",
    ariaValueText: "",
    orientation: undefined,
  },
);

const emit = defineEmits<{
  (e: "change", { x, y }: { x: number; y: number }): void;
}>();

const areaRef = ref<HTMLDivElement | null>(null);
const mouse = useMouseInElement(areaRef);
const isDragging = ref(false);

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
const disabled = computed(() => context?.disabled.value ?? false);

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

const onKeyDown = (e: KeyboardEvent) => {
  if (disabled.value) return;

  const stepSize = e.shiftKey ? props.shiftStep : props.step;
  let newX = props.x;
  let newY = props.y;
  let handled = true;

  switch (e.key) {
    case "ArrowLeft":
      newX = clamp(props.x - stepSize);
      break;
    case "ArrowRight":
      newX = clamp(props.x + stepSize);
      break;
    case "ArrowUp":
      newY = clamp(props.y - stepSize);
      break;
    case "ArrowDown":
      newY = clamp(props.y + stepSize);
      break;
    case "Home":
      newX = 0;
      newY = 0;
      break;
    case "End":
      newX = 1;
      newY = 1;
      break;
    default:
      handled = false;
  }

  if (handled) {
    e.preventDefault();
    emit("change", { x: newX, y: newY });
  }
};

let rafId: number | null = null;

const updatePosition = () => {
  if (disabled.value) return;
  if (rafId) return;

  rafId = requestAnimationFrame(() => {
    const { elementX, elementY, elementWidth, elementHeight } = mouse;
    const w = elementWidth.value ?? 0;
    const h = elementHeight.value ?? 0;

    if (w && h) {
      const x = clamp(elementX.value / w);
      const y = clamp(elementY.value / h);
      emit("change", { x, y });
    }
    rafId = null;
  });
};

const onPointerDown = (e: PointerEvent) => {
  if (disabled.value) return;
  isDragging.value = true;
  updatePosition();
  const el = areaRef.value as HTMLElement;
  if (el) {
    el.focus();
    if (typeof el.setPointerCapture === "function") {
      try {
        el.setPointerCapture(e.pointerId);
      } catch (err) {
        console.warn("Failed to set pointer capture", err);
      }
    }
  }
};

const onPointerUp = (e: PointerEvent) => {
  isDragging.value = false;
  const el = areaRef.value as HTMLElement;
  if (el && typeof el.releasePointerCapture === "function") {
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {
      console.warn("Failed to release pointer capture", err);
    }
  }
};

useEventListener(window, "pointermove", () => {
  if (isDragging.value) {
    updatePosition();
  }
});

useEventListener(window, "pointerup", onPointerUp);

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    ref="areaRef"
    role="slider"
    tabindex="0"
    :aria-label="props.label"
    :aria-valuemin="0"
    :aria-valuemax="1"
    :aria-valuenow="props.x"
    :aria-valuetext="props.ariaValueText"
    :aria-orientation="props.orientation"
    aria-roledescription="color picker area"
    :aria-disabled="disabled"
    class="relative h-full w-full touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    :class="
      cn(
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-crosshair',
        props.class,
      )
    "
    @pointerdown="onPointerDown"
    @keydown="onKeyDown"
  >
    <slot />
  </div>
</template>
