<script setup lang="ts">
import {Menu, SquareX} from 'lucide-vue-next'
const isMenuOpen = ref(false)
const {t} = useI18n();
const route = useRoute();
const navItems = [
  // {name: t('About'), href: '/#about'},
  // {name: t('Skills'), href: '/#skills'},
  // {name: t('Projects'), href: '#projects'},
  // {name: t('Contact'), href: '#contact'}
]
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <nav class="container mx-auto px-6 py-4  w-full">
      <div class="flex items-center justify-between">
        <div class="text-xl font-medium inline-flex md:block">
          <NuxtLink to="/" class="hover:text-primary/80 transition-colors">
            Heimr
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center space-x-2">
          <NuxtLink
              v-for="item in navItems"
              :key="item.name"
              :to="item.href"
              class="text-foreground/80 hover:text-foreground transition-colors cursor-pointer  py-2 px-8 rounded-sm bg-opacity-60"
              :class="{'current': route.hash === item.href}"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <button
            class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-foreground/5 transition-colors"
            @click="isMenuOpen = !isMenuOpen"
            :aria-expanded="isMenuOpen.toString()"
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
        >
          <Menu v-if="!isMenuOpen" />
          <SquareX v-else />
        </button>
      </div>
      <div
          v-if="isMenuOpen"
          id="mobile-nav"
          class="md:hidden mt-4 py-4 border-t border-border"
      >
        <div class="flex flex-col space-y-4">
          <NuxtLink
              v-for="item in navItems"
              :key="item.name"
              :to="item.href"
              class="text-foreground/80 hover:text-foreground transition-colors py-2 px-8 rounded-sm bg-opacity-60"
              :class="{'current': route.hash === item.href}"
              @click="isMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@reference "#main";

.current {
  @apply bg-gray-700;
}
</style>