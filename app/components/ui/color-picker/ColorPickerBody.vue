<script setup lang="ts">
import { cn } from "~/lib/utils";
import { PopoverContent } from "../popover";
import type { HTMLAttributes } from "vue";

import { inject, computed } from "vue";
import { COLOR_PICKER_KEY, type ColorPickerContext } from "./types";

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
    :as-child="true"
    :side="side"
    :align="align"
    :side-offset="sideOffset"
  >
    <div
      data-slot="card"
      :class="
        cn(
          'bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-4 shadow-md focus:outline-none',
          props.class,
        )
      "
    >
      <slot />
    </div>
  </PopoverContent>
</template>
