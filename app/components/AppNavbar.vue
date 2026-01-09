<script setup lang="ts">
import ModeToggle from "./ui/ModeToggle.vue";
import { HugeiconsIcon } from "@hugeicons/vue";
import { Github } from "@hugeicons/core-free-icons";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "./ui/sheet";
import { Button } from "./ui/button";

const socialLinks = [
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/hetari/mesh-magic",
  },
];

const navItems = [
  { label: "Mesh", to: "/" },
  { label: "Normal", to: "/" },
  { label: "Grainy", to: "/" },
];
</script>

<template>
  <header
    class="bg-background/95 supports-backdrop-filter:bg-background/50 sticky top-0 z-50 w-full border-b backdrop-blur"
  >
    <div
      class="container mx-auto flex h-14 max-w-6xl items-center px-4 lg:px-0"
    >
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="font-bold">Mesh Magic</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="ml-auto hidden items-center space-x-4 md:flex">
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to + item.label"
            :to="item.to"
            class="hover:text-foreground/80 text-foreground/60 transition-colors"
            active-class="text-foreground"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center space-x-3">
          <NuxtLink
            v-for="link in socialLinks"
            :key="link.href"
            :to="link.href"
            external
            class="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Open social link"
          >
            <HugeiconsIcon :icon="link.icon" class="size-5" />
          </NuxtLink>

          <ModeToggle />
        </div>
      </div>

      <!-- Mobile actions: hamburger + sheet -->
      <div class="ml-auto flex items-center md:hidden">
        <div class="flex items-center space-x-3">
          <ModeToggle />
          <NuxtLink
            v-for="link in socialLinks"
            :key="link.href + '-mobile'"
            :to="link.href"
            external
            class="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Open social link"
          >
            <HugeiconsIcon :icon="link.icon" class="size-5" />
          </NuxtLink>
        </div>
        <Sheet>
          <SheetTrigger as-child>
            <Button
              aria-label="Open menu"
              variant="ghost"
              size="icon"
              class="p-2"
            >
              <!-- simple hamburger icon -->
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </SheetTrigger>

          <ClientOnly>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <NuxtLink to="/" class="text-lg font-semibold">
                    Mesh Magic
                  </NuxtLink>
                </SheetTitle>
                <SheetDescription>
                  Create stunning gradients for your next project. Choose a
                  generator to get started.
                </SheetDescription>
              </SheetHeader>

              <nav class="flex flex-col gap-4 px-4">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.to + '-mobile-' + item.label"
                  :to="item.to"
                  class="hover:bg-muted rounded-md px-2 py-2 text-base font-medium"
                >
                  {{ item.label }}
                </NuxtLink>
              </nav>

              <div class="mx-4 mt-4 border-t pt-4">
                <div class="flex items-center justify-between">
                  <ModeToggle />
                </div>
              </div>

              <SheetFooter class="mt-auto px-4 pb-6">
                <div class="text-muted-foreground text-sm">
                  Built with love · © {{ new Date().getFullYear() }}
                </div>
              </SheetFooter>
            </SheetContent>
          </ClientOnly>
        </Sheet>
      </div>
    </div>
  </header>
</template>
