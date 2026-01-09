<script setup lang="ts">
import type { ColorValue } from "../ui/color-picker/types";

defineProps<{
  config: {
    baseColor: ColorValue;
    layers: {
      id: number;
      color: ColorValue;
      x: number;
      y: number;
      size: number;
      blur: number;
      borderRadius: string;
    }[];
  };
}>();

defineEmits<{
  removeLayer: [index: number];
}>();
</script>
<template>
  <div
    class="relative aspect-video w-full"
    :style="{ backgroundColor: config.baseColor.hex }"
  >
    <div
      v-for="layer in config.layers"
      :key="layer.id"
      class="pointer-events-none absolute mix-blend-screen transition-all duration-700 ease-out"
      :style="{
        width: layer.size + '%',
        height: layer.size + '%',
        left: layer.x + '%',
        top: layer.y + '%',
        backgroundColor: layer.color.hex,
        filter: `blur(${layer.blur}px)`,
        borderRadius: layer.borderRadius,
        opacity: 0.8,
      }"
    />

    <!-- Grain Texture Overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"
    />
  </div>
</template>
