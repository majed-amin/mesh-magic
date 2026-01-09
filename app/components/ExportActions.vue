<script setup lang="ts">
defineProps<{
  css: string;
  svg?: string;
}>();

const emit = defineEmits<{
  "download-image": [];
  "copy-css": [];
  "copy-svg": [];
}>();

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Ideally show a toast here
  console.log("Copied to clipboard");
};
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <Button
      variant="outline"
      @click="
        emit('copy-css');
        copyToClipboard(css);
      "
    >
      Copy CSS
    </Button>
    <Button
      v-if="svg"
      variant="outline"
      @click="
        emit('copy-svg');
        copyToClipboard(svg);
      "
    >
      Copy SVG
    </Button>
    <Button variant="outline" @click="emit('download-image')">
      Download Image
    </Button>
  </div>
</template>
