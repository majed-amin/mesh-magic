import type { Ref, InjectionKey } from "vue";

// Color value types
export type HexColor = string;
export type RgbColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type HsvColor = {
  h: number;
  s: number;
  v: number;
  a: number;
};

export type OklchColor = {
  l: number;
  c: number;
  h: number;
  a: number;
};

export type ColorValue = {
  hex: HexColor;
  rgb: RgbColor;
  hsv: HsvColor;
  oklch: OklchColor;
};

// Props
export type ColorPickerProps = {
  modelValue?: ColorValue | string;
  format?: "hex" | "rgb" | "hsv" | "oklch";
  disabled?: boolean;
  disableAlpha?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  class?: string;
};

// Context
export type ColorPickerContext = {
  hsv: Ref<HsvColor>;
  color: Ref<ColorValue>;
  previewColor: Ref<ColorValue>;
  setHsv: (hsv: Partial<HsvColor>) => void;
  setColor: (color: ColorValue) => void;
  setPreviewColor: (color: ColorValue) => void;
  emitColorChange: (color: ColorValue) => void;
  disabled: Ref<boolean>;
  disableAlpha: Ref<boolean>;
  open: Ref<boolean>;
  format: Ref<string>;
  popoverProps: {
    side: Ref<"top" | "right" | "bottom" | "left" | undefined>;
    align: Ref<"start" | "center" | "end" | undefined>;
    sideOffset: Ref<number | undefined>;
  };
};

// Injection key
export const COLOR_PICKER_KEY: InjectionKey<ColorPickerContext> =
  Symbol("color-picker");
