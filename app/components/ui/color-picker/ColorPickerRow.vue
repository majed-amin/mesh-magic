<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="cn('flex items-center justify-between gap-2', props.class)"
    role="group"
    aria-label="Color picker row"
  >
    <slot />
  </div>
</template>
