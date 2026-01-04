<script setup lang="ts">
import { parseColor } from "~/components/ui/color-picker/color.utils";
import type { ColorValue } from "~/components/ui/color-picker/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const baseColor = ref<ColorValue>(parseColor("#020617"));

const themes = {
  cosmic: [
    parseColor("#0ea5e9"),
    parseColor("#2dd4bf"),
    parseColor("#06b6d4"),
    parseColor("#4f46e5"),
  ],
  mystic: [
    parseColor("#8b5cf6"),
    parseColor("#d946ef"),
    parseColor("#ec4899"),
    parseColor("#6366f1"),
  ],
  sunset: [
    parseColor("#f43f5e"),
    parseColor("#fb923c"),
    parseColor("#fbbf24"),
    parseColor("#be123c"),
  ],
  ocean: [
    parseColor("#0369a1"),
    parseColor("#0891b2"),
    parseColor("#0d9488"),
    parseColor("#1e40af"),
  ],
  forest: [
    parseColor("#059669"),
    parseColor("#16a34a"),
    parseColor("#84cc16"),
    parseColor("#065f46"),
  ],
  aurora: [
    parseColor("#2dd4bf"),
    parseColor("#84cc16"),
    parseColor("#3b82f6"),
    parseColor("#10b981"),
  ],
};
const config = reactive<{
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
}>({
  baseColor: baseColor.value,
  layers: [],
});

const generateOrganicRadius = () => {
  const r = () => Math.floor(Math.random() * 50 + 30) + "%";
  return `${r()} ${r()} ${r()} ${r()} / ${r()} ${r()} ${r()} ${r()}`;
};

const applyTheme = (colors: ColorValue[]) => {
  config.layers = [];
  colors.forEach((color) => addLayer(color));
};

const addLayer = (color?: ColorValue) => {
  if (!color) {
    color = parseColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  config.layers.push({
    id: Date.now() + Math.random(),
    color: color,
    x: Math.floor(Math.random() * 80),
    y: Math.floor(Math.random() * 80),
    size: Math.floor(Math.random() * 40 + 50),
    blur: Math.floor(Math.random() * 100 + 80),
    borderRadius: generateOrganicRadius(),
  });
};
const removeLayer = (index: number) => {
  config.layers.splice(index, 1);
};

const randomize = () => {
  const themeKeys = Object.keys(themes);
  const randomTheme =
    themes[
      themeKeys[
        Math.floor(Math.random() * themeKeys.length)
      ] as keyof typeof themes
    ];
  applyTheme(randomTheme);
};

const reset = () => {
  config.baseColor = parseColor("#020617");
  applyTheme(themes.cosmic);
};

onMounted(() => {
  reset();
});
</script>

<template>
  <div class="bg-background flex min-h-screen flex-col lg:flex-row">
    <div class="order-2 flex flex-1 items-center justify-center lg:order-1">
      <MeshGradient :config="config" @remove-layer="removeLayer" />
    </div>

    <SidebarRoot>
      <SidebarHeader>
        <SidebarTitle>Mesh Gradient</SidebarTitle>
        <SidebarDescription>
          Customize your gradient with precision
        </SidebarDescription>
      </SidebarHeader>

      <SidebarContent class="space-y-4">
        <section class="flex flex-col gap-4">
          <span class="text-sm leading-none font-medium">Base Color</span>
          <div class="flex w-full gap-2">
            <ColorPicker v-model="baseColor" />
            <Input v-model="baseColor.hex" />
          </div>
        </section>

        <section class="mb-8">
          <span
            class="mb-2 block text-[10px] font-bold tracking-widest text-slate-400 uppercase"
            >Quick Themes</span
          >
          <div class="grid grid-cols-3 gap-2">
            <Button
              v-for="(colors, themeName) in themes"
              :key="themeName"
              @click="applyTheme(colors)"
            >
              {{ themeName }}
            </Button>
          </div>
        </section>

        <!-- Section: Layers -->
        <section class="mb-8">
          <div class="mb-4 flex items-center justify-between">
            <span
              class="text-[10px] font-bold tracking-widest text-slate-400 uppercase"
            >
              Gradient Layers
            </span>
            <span class="text-[10px] text-slate-400">{{
              config.layers.length
            }}</span>
          </div>

          <div class="space-y-4">
            <Card v-for="(layer, index) in config.layers" :key="layer.id">
              <CardHeader>
                <CardTitle>Layer {{ index + 1 }}</CardTitle>
                <CardDescription>Layer {{ index + 1 }}</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="mb-4 flex items-center justify-between">
                  <span class="text-[10px] font-bold text-slate-400"
                    >Layer {{ index + 1 }}</span
                  >
                  <Button class="hover:underline" @click="removeLayer(index)">
                    Remove
                  </Button>
                </div>

                <div class="mb-4 flex gap-2">
                  <Input v-model="layer.color.hex" />
                  <Input v-model="layer.color.hex" />
                </div>

                <div class="space-y-3">
                  <div class="flex flex-col gap-1">
                    <div
                      class="flex justify-between text-[10px] font-medium text-slate-500"
                    >
                      <span>Position X</span>
                      <span>{{ layer.x }}%</span>
                    </div>
                    <Input v-model="layer.x" type="range" min="-50" max="100" />
                  </div>

                  <div class="flex flex-col gap-1">
                    <div
                      class="flex justify-between text-[10px] font-medium text-slate-500"
                    >
                      <span>Position Y</span>
                      <span>{{ layer.y }}%</span>
                    </div>
                    <Input v-model="layer.y" type="range" min="-50" max="100" />
                  </div>

                  <div class="flex flex-col gap-1">
                    <div
                      class="flex justify-between text-[10px] font-medium text-slate-500"
                    >
                      <span>Blur Size</span>
                      <span>{{ layer.blur }}px</span>
                    </div>
                    <Input
                      v-model="layer.blur"
                      type="range"
                      min="20"
                      max="300"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button @click="removeLayer(index)">Remove</Button>
              </CardFooter>
            </Card>
          </div>

          <div class="flex gap-2">
            <Button class="mt-4" @click="addLayer()"> + Add Layer </Button>
            <Button class="mt-4" @click="randomize"> Randomize </Button>
          </div>
        </section>
      </SidebarContent>
    </SidebarRoot>
  </div>
</template>
