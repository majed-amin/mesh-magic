<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";
import { inject, computed } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
const color = computed(() => context?.color.value);
</script>

<template>
  <div
    role="img"
    :aria-label="`Current color: ${color?.hex || 'none'}`"
    :class="cn('size-9 shrink-0 rounded-md border shadow-inner', props.class)"
    :style="{ backgroundColor: color?.hex || 'transparent' }"
  />
</template>
