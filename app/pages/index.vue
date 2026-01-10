<script setup lang="ts">
// /* Preview config (left column) - user editable / randomizable */
// const { config, removeLayer, randomize, reset, addLayer } = useMeshGradient();

// /* Site background config (full-viewport) - randomized on each page load */

// /* Controls wrappers */
// const randomizePreview = () => randomize(3, 7);
// const resetPreview = () => reset();

// tryOnBeforeMount(() => {
//   resetPreview();
// });
</script>

<template>
  <div>test</div>
  <!-- Main layout: two columns on md+ (preview left, controls right) -->
  <!-- <section class="container mx-auto">
    <div class="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
      <div class="md:col-span-2">
        <div
          class="border-muted bg-background/60 rounded-lg border p-4 shadow-2xl backdrop-blur-sm"
        >
          <div class="mb-4 flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold">Preview</h2>

            <div class="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                title="Randomize preview"
                @click="randomizePreview"
              >
                Randomize
              </Button>

              <Button
                variant="ghost"
                title="Reset preview"
                @click="resetPreview"
              >
                Reset
              </Button>

              <span
                >Small toolbar: export image and ask the user the width and h
                for it
              </span>
              <span> Copy CSS the tailwind thngs </span>
            </div>
          </div>

          <div class="border-muted/40 overflow-hidden rounded-md border">
            <div class="aspect-video w-full">
              <MeshGradient
                :config
                class="h-full w-full"
                @remove-layer="removeLayer"
              />
            </div>
          </div>
        </div>
      </div>

      <MeshGradientLayers
        v-model:config="config"
        :add-preview-layer="addLayer"
        :randomize-preview="randomizePreview"
      />
    </div>
  </section> -->
</template>
