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

      <div class="max-h-[40vh] space-y-2 overflow-auto pr-2">
        <template v-if="config.layers.length">
          <ClientOnly>
            <div
              v-for="(layer, index) in config.layers"
              :key="layer.id"
              class="border-muted/30 bg-background/50 flex flex-col gap-2 rounded-md border p-3"
              role="group"
              :aria-label="`Layer ${index + 1}`"
            >
              <div class="flex items-center justify-between gap-3">
                <!-- Left: Swatch + title + meta -->
                <div class="flex min-w-0 items-center gap-3">
                  <ColorPicker
                    v-model="layer.color"
                    class="h-10 w-10 shrink-0"
                  />
                </div>

                <!-- Right: actions and expandable controls -->
                <div class="flex items-center gap-2">
                  <!-- Duplicate -->
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-muted-foreground hover:bg-muted/30 h-8 w-8"
                    :title="'Duplicate layer ' + (index + 1)"
                    @click.prevent="duplicateLayer(index)"
                  >
                    ⎘
                    <span class="sr-only">Duplicate layer</span>
                  </Button>

                  <!-- Toggle expanded -->
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-muted-foreground hover:bg-muted/30 h-8 w-8"
                    :aria-expanded="
                      expandedLayers.has(layer.id) ? 'true' : 'false'
                    "
                    :title="
                      expandedLayers.has(layer.id)
                        ? 'Hide controls'
                        : 'Show controls'
                    "
                    @click="toggleExpanded(layer.id)"
                  >
                    <svg
                      v-if="!expandedLayers.has(layer.id)"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M18 15l-6-6-6 6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span class="sr-only">Toggle controls</span>
                  </Button>

                  <!-- Remove -->
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-destructive hover:bg-destructive/10 h-8 w-8"
                    :title="'Remove layer ' + (index + 1)"
                    @click.prevent="removeLayer(index)"
                  >
                    ✕
                    <span class="sr-only">Remove layer</span>
                  </Button>
                </div>
              </div>

              <!-- Expanded controls panel -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
              >
                <div v-if="expandedLayers.has(layer.id)" class="pt-2">
                  <div class="grid grid-cols-2 gap-3">
                    <!-- size -->
                    <div class="flex flex-col gap-1.5">
                      <Label class="text-xs">Size</Label>
                      <input
                        v-model="layer.size"
                        type="range"
                        min="10"
                        max="200"
                        step="1"
                        class="w-full"
                      />
                      <div class="text-muted-foreground text-xs">
                        {{ layer.size }}%
                      </div>
                    </div>

                    <!-- blur -->
                    <div class="flex flex-col gap-1.5">
                      <Label class="text-xs">Blur</Label>
                      <input
                        v-model="layer.blur"
                        type="range"
                        min="0"
                        max="300"
                        step="1"
                        class="w-full"
                      />
                      <div class="text-muted-foreground text-xs">
                        {{ layer.blur }}px
                      </div>
                    </div>

                    <!-- x position -->
                    <div class="flex flex-col gap-1.5">
                      <Label class="text-xs">X position</Label>
                      <input
                        v-model="layer.x"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        class="w-full"
                      />
                      <div class="text-muted-foreground text-xs">
                        {{ layer.x }}%
                      </div>
                    </div>

                    <!-- y position -->
                    <div class="flex flex-col gap-1.5">
                      <Label class="text-xs">Y position</Label>
                      <input
                        v-model="layer.y"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        class="w-full"
                      />
                      <div class="text-muted-foreground text-xs">
                        {{ layer.y }}%
                      </div>
                    </div>

                    <!-- border radius (text) -->
                    <div class="col-span-2 flex flex-col gap-1.5">
                      <Label class="text-xs">Border radius</Label>
                      <Input
                        v-model="layer.borderRadius"
                        type="text"
                        class="h-8 text-xs"
                      />
                      <div class="text-muted-foreground text-xs">
                        CSS border-radius value (e.g. 40% 60% / 50% 30%)
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </ClientOnly>
        </template>

        <div v-else class="text-muted-foreground text-sm">No layers yet.</div>
      </div>
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
