<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner";
import {
  CircleLockCheckIcon,
  Info,
  Loader,
  Octagon,
  AlertIcon,
  X,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import { Toaster as Sonner } from "vue-sonner";
import { cn } from "@/lib/utils";

const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <HugeiconsIcon :icon="CircleLockCheckIcon" class="size-4" />
    </template>
    <template #info-icon>
      <HugeiconsIcon :icon="Info" class="size-4" />
    </template>
    <template #warning-icon>
      <HugeiconsIcon :icon="AlertIcon" class="size-4" />
    </template>
    <template #error-icon>
      <HugeiconsIcon :icon="Octagon" class="size-4" />
    </template>
    <template #loading-icon>
      <HugeiconsIcon :icon="Loader" class="size-4 animate-spin" />
    </template>
    <template #close-icon>
      <HugeiconsIcon :icon="X" class="size-4" />
    </template>
  </Sonner>
</template>
