<script setup lang="ts">
import MeshSidebar from "~/components/ui/MeshSidebar.vue";
</script>

<template>
  <!-- <div class="bg-background size-full font-sans subpixel-antialiased">
    <AppNavbar />

    <div class="flex flex-col items-center justify-center p-8">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-5xl font-extrabold lg:text-6xl">Mesh Magic</h1>
        <p class="text-muted-foreground mx-auto max-w-2xl text-xl">
          Create stunning gradients for your next project. Choose a generator to
          get started.
        </p>
      </div>
      <slot />
    </div>
  </div> -->
  <MeshSidebar>
    <slot />
  </MeshSidebar>
</template>
