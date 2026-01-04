# Color Picker Component

A highly modular, Shadcn-style color picker built with Vue 3. It supports multiple color formats, precise control over the saturation/hue area, and a fully configurable popover.

## Architecture

The component follows a primitive-first architecture:

- **`ColorPickerRoot`**: The logical engine. Provides state and methods via context and scoped slots.
- **`ColorPicker`**: A pre-composed, high-level component that uses all primitives for an out-of-the-box experience.
- **Sub-components**: Modular pieces (`Saturation`, `Hue`, `Input`, `Label`, etc.) that can be rearranged or customized.

---

## Basic Usage

```vue
<script setup>
import { ColorPicker } from '@/components/ui/color-picker';
const color = ref('#6366f1');
</script>

<template>
  <ColorPicker v-model="color" />
</template>
```

---

## Props Reference

Available on both `ColorPickerRoot` and the high-level `ColorPicker`.

| Prop           | Type                                 | Default     | Description                                                         |
| :------------- | :----------------------------------- | :---------- | :------------------------------------------------------------------ |
| `modelValue`   | `string \| ColorValue`               | `'#000000'` | The current color value. Supports HEX, RGB, HSV, and OKLCH strings. |
| `format`       | `'hex' \| 'rgb' \| 'hsv' \| 'oklch'` | `'hex'`     | Determines the string format for `v-model` and the text input.      |
| `open`         | `boolean`                            | `false`     | Controls the open state of the popover.                             |
| `disabled`     | `boolean`                            | `false`     | Disables all interactions with the picker.                          |
| `disableAlpha` | `boolean`                            | `false`     | Hides/disables alpha channel controls (where applicable).           |

### Popover Configuration

| Prop         | Type                                     | Default    | Description                          |
| :----------- | :--------------------------------------- | :--------- | :----------------------------------- |
| `side`       | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side to open the picker.   |
| `align`      | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment relative to the trigger.   |
| `sideOffset` | `number`                                 | `4`        | Distance in pixels from the trigger. |

---

## Events

| Event               | Payload                | Description                                                                       |
| :------------------ | :--------------------- | :-------------------------------------------------------------------------------- |
| `update:modelValue` | `string \| ColorValue` | Emitted when the color changes.                                                   |
| `update:open`       | `boolean`              | Emitted when the popover opens or closes.                                         |
| `change`            | `ColorValue`           | Emitted onทุก interaction with the high-level object representation of the color. |

---

## Sub-components (Primitives)

Use these to build your own custom layout:

- **`ColorPickerPreview`**: The trigger button showing the selected color.
- **`ColorPickerBody`**: The popover container.
- **`ColorPickerSaturation`**: The large 2D area for saturation and value adjustment.
- **`ColorPickerHue`**: The rainbow slider for hue adjustment.
- **`ColorPickerAlpha`**: A slider for transparency (alpha) adjustment with a checkered background.
- **`ColorPickerArea`**: A low-level utility to handle mouse/touch interactions inside sliders or areas.
- **`ColorPickerIndicator`**: The "ring" visual showing the current selection.
- **`ColorPickerInput`**: A smart text input that reacts to the `format` prop.
- **`ColorPickerLabel`**: Stylized typography for labels.
- **`ColorPickerSwatch`**: A simple box showing the currently selected color.
- **`ColorPickerSection`**: A container for grouping elements with standard spacing.
- **`ColorPickerRow`**: A container for horizontal alignment.

---

## Color Utilities

The component includes a robust utility library in `color.utils.ts`:

- **`parseColor(input)`**: Converts any supported string or object into a unified `ColorValue` object.
- **`formatColor(color, format)`**: Converts a `ColorValue` object into a CSS-ready string (e.g., `rgba(...)`, `oklch(...)`).

### Supported Formats

- **Hex**: `#RRGGBB` or `#RGB`
- **RGB**: `rgb(r, g, b)` / `rgba(r, g, b, a)`
- **HSV**: `hsv(h, s%, v%)` / `hsva(h, s%, v%, a)`
- **OKLCH**: `oklch(l c h)` / `oklch(l c h / a)`
- **Names**: `red`, `blue`, etc. (resolved in-browser)
