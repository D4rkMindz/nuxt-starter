<script setup lang="ts">

const {t} = useI18n()
const lp = useLocalePath()
useHead({
  title: t('index.title'),
})
onMounted(async () => {
})
</script>

<template>
  <div class="flex flex-col">
    <h1>Heimr Admin</h1>
    <NuxtLink :to="lp('/users')">{{ $t('Check users') }}</NuxtLink>
  </div>
</template>