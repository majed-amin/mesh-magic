<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span
    :class="
      cn(
        'text-[11px] font-medium text-muted-foreground uppercase tracking-tight',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
