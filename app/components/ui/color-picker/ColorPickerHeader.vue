<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="color-picker-header"
    class="space-y-4"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>
