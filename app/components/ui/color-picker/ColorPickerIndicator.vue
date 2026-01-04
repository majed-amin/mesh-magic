<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  left: string | number;
  top: string | number;
  color?: string;
}>();
</script>

<template>
  <div
    role="presentation"
    aria-hidden="true"
    class="absolute z-[1] -translate-x-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-white box-border pointer-events-none"
    :class="cn(props.class)"
    :style="{
      left: typeof props.left === 'number' ? `${props.left}%` : props.left,
      top: typeof props.top === 'number' ? `${props.top}%` : props.top,
      backgroundColor: props.color || 'transparent',
      touchAction: 'none',
      forcedColorAdjust: 'none',
      boxShadow: '0 0 0 2px white, 0 0 4px rgba(0,0,0,0.5)',
    }"
  />
</template>
