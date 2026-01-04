<script setup lang="ts">
import { cn } from "~/lib/utils";
import { PopoverContent } from "../popover";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const context = inject<ColorPickerContext>(COLOR_PICKER_KEY);
const side = computed(() => context?.popoverProps.side.value);
const align = computed(() => context?.popoverProps.align.value);
const sideOffset = computed(() => context?.popoverProps.sideOffset.value);
</script>

<template>
  <PopoverContent
    :side="side"
    :align="align"
    :side-offset="sideOffset"
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex w-64 flex-col gap-4 rounded-xl border p-4 shadow-md focus:outline-none',
        props.class,
      )
    "
  >
    <slot />
  </PopoverContent>
</template>
