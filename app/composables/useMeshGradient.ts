import { reactive } from "vue";
import { parseColor } from "~/components/ui/color-picker/color.utils";
import type { ColorValue } from "~/components/ui/color-picker/types";
import { themes } from "~/utils/themes";

const BASE_COLOR = "#020617";

/* Types */
export type Layer = {
  id: number;
  color: ColorValue;
  x: number;
  y: number;
  size: number;
  blur: number;
  borderRadius: string;
};

export type MeshConfig = {
  baseColor: ColorValue;
  layers: Layer[];
};

type Region =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

/* Helpers */
export const randomHex = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateOrganicRadius = () => {
  const r = () => Math.floor(Math.random() * 50 + 30) + "%";
  return `${r()} ${r()} ${r()} ${r()} / ${r()} ${r()} ${r()} ${r()}`;
};

const randomRegion = (): Region => {
  const regions: Region[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center",
  ];
  return regions[Math.floor(Math.random() * regions.length)] as Region;
};

const randomPositionByRegion = () => {
  switch (randomRegion()) {
    case "top-left":
      return { x: rand(5, 35), y: rand(5, 35) };
    case "top-right":
      return { x: rand(65, 95), y: rand(5, 35) };
    case "bottom-left":
      return { x: rand(5, 35), y: rand(65, 95) };
    case "bottom-right":
      return { x: rand(65, 95), y: rand(65, 95) };
    case "center":
    default:
      return { x: rand(35, 65), y: rand(35, 65) };
  }
};

const makeLayer = (color?: ColorValue): Layer => {
  const { x, y } = randomPositionByRegion();

  return {
    id: Date.now() + Math.random(),
    color: color ?? parseColor(randomHex()),
    x,
    y,
    size: rand(40, 50),
    blur: rand(80, 90),
    borderRadius: generateOrganicRadius(),
  };
};

export function useMeshGradient(initialBaseColor = BASE_COLOR) {
  const config = reactive<MeshConfig>({
    baseColor: parseColor(initialBaseColor),
    layers: [],
  });

  const addLayer = (color?: ColorValue) => {
    config.layers.push(makeLayer(color));
  };

  const removeLayer = (index: number) => {
    config.layers.splice(index, 1);
  };

  const duplicateLayer = (index: number) => {
    const source = config.layers[index];
    if (!source) return;
    const dup = { ...source, id: Date.now() + Math.random() };
    config.layers.splice(index + 1, 0, dup);
  };

  const updateLayer = ({ index, layer }: { index: number; layer: Layer }) => {
    config.layers.splice(index, 1, layer);
  };

  const randomize = (minLayers = 3, maxLayers = 8, newBaseColor?: string) => {
    if (newBaseColor) {
      config.baseColor = parseColor(newBaseColor);
    } else {
      // Only randomize base color if explicitly asked (or for site bg logic)
      // But wait, the original code for preview randomize:
      // previewConfig.baseColor = parseColor(BASE_COLOR); (Reset to dark)
    }

    // For general randomize, let's assume we might want to change base color or keep it.
    // The original code had:
    // Preview Randomize: base=#020617, 3-7 layers
    // Site BG Randomize: base=random, 4-9 layers

    // Let's make this flexible
    const count = Math.floor(
      Math.random() * (maxLayers - minLayers + 1) + minLayers,
    );
    config.layers = [];
    for (let i = 0; i < count; i++) {
      // For site bg, it used makeLayer() with random color (default behavior of makeLayer)
      // For preview, it used addPreviewLayer(), which calls makeLayer(undefined) -> random color
      config.layers.push(makeLayer());
    }
  };

  const applyTheme = (name: keyof typeof themes) => {
    const t = themes[name];
    if (!t) return;
    config.layers = [];
    t.forEach((c) => addLayer(c));
  };

  const reset = (defaultBase = BASE_COLOR) => {
    config.baseColor = parseColor(defaultBase);
    if (themes.cosmic) {
      config.layers = [];
      (themes.cosmic as ColorValue[]).forEach((c) => addLayer(c));
    } else {
      randomize(3, 7);
    }
  };

  return {
    config,
    addLayer,
    removeLayer,
    duplicateLayer,
    updateLayer,
    randomize,
    applyTheme,
    reset,
  };
}
