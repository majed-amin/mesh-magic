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
        'text-muted-foreground text-[11px] font-medium tracking-tight uppercase',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
