<script setup lang="ts">
import { parseColor, isValidColor } from "./ui/color-picker/color.utils";
import ColorPicker from "./ui/color-picker/ColorPicker.vue";
import type { ColorValue } from "./ui/color-picker/types";
import { Input } from "./ui/input";

const baseColor = ref<ColorValue>(parseColor("#020617"));

// Sync external input with baseColor
const hexValue = ref(baseColor.value.hex);
watch(
  () => baseColor.value.hex,
  (newHex) => {
    if (hexValue.value !== newHex) {
      hexValue.value = newHex;
    }
  },
);
watch(hexValue, (val) => {
  if (isValidColor(val, "hex")) {
    baseColor.value = parseColor(val);
  }
});
</script>

<template>
  <SidebarRoot>
    <SidebarHeader>
      <SidebarTitle>Mesh Gradient</SidebarTitle>
      <SidebarDescription>
        Customize your gradient with precision
      </SidebarDescription>
    </SidebarHeader>

    <SidebarContent>
      <div class="flex flex-col gap-4">
        <span class="text-sm leading-none font-medium">Base Color</span>
        <div class="flex w-full gap-2">
          <ColorPicker v-model="baseColor" />
          <Input v-model="hexValue" />
        </div>
      </div>
    </SidebarContent>
  </SidebarRoot>
</template>
