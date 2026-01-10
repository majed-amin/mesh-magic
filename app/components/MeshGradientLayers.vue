<script setup lang="ts">
import type { ColorValue } from "@/components/ui/color-picker/types";
import { ColorPicker } from "~/components/ui/color-picker";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

defineProps<{
  addPreviewLayer: VoidFunction;
  randomizePreview: VoidFunction;
}>();

const config = defineModel<{
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
}>("config", { required: true });

// Track expanded state for each layer by ID
const expandedLayers = reactive(new Set<number>());

const toggleExpanded = (id: number) => {
  if (expandedLayers.has(id)) {
    expandedLayers.delete(id);
  } else {
    expandedLayers.add(id);
  }
};

const duplicateLayer = (index: number) => {
  const layer = config.value.layers[index];
  if (!layer) return;
  const newLayer = {
    ...layer,
    id: Date.now() + Math.random(),
    x: Math.min(100, layer.x + 5),
    y: Math.min(100, layer.y + 5),
  };
  config.value.layers.splice(index + 1, 0, newLayer);
};

const removeLayer = (index: number) => {
  config.value.layers.splice(index, 1);
};
</script>

<template>
  <aside class="md:col-span-1">
    <div
      class="border-muted bg-background/60 space-y-4 rounded-lg border p-4 backdrop-blur-sm"
    >
      <h3 class="text-sm font-medium">Controls</h3>

      <div class="space-y-2">
        <Label>Base Color</Label>
        <div class="flex w-full gap-2">
          <ClientOnly>
            <ColorPicker v-model="config.baseColor" />
          </ClientOnly>
          <Input v-model="config.baseColor.hex" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <h4 class="text-sm font-medium">Layers</h4>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="addPreviewLayer()"
            >Add Layer</Button
          >
          <Button variant="outline" size="sm" @click="randomizePreview"
            >Randomize</Button
          >
        </div>
      </div>

      <!-- <div class="max-h-[40vh] space-y-2 overflow-auto pr-2"></div> -->
      <!--
      <div class="border-muted/20 border-t pt-2">
        <div class="text-muted-foreground mb-2 text-xs">Apply theme</div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="(val, key) in themes"
            :key="key"
            class="btn-outline rounded-md px-2 py-1 text-xs"
            @click="applyPreviewTheme(key)"
          >
            {{ key }}
          </button>
        </div>
      </div> -->
      <!--
      <div
        class="border-muted/20 flex items-center justify-between border-t pt-3 text-sm"
      >
        <div class="text-muted-foreground">Preview base</div>
        <div class="text-muted-foreground">
          {{ config.layers.length }} layers
        </div>
      </div> -->
    </div>
  </aside>
</template>
