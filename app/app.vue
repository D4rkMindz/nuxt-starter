<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s - Heimr',
  link: [
    // Favicon
    {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon/favicon-16x16.png'},
    {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon/favicon-32x32.png'},
    {rel: 'icon', type: 'image/x-icon', href: '/img/favicon/favicon.ico'},

    // Android
    {rel: 'icon', type: 'image/png', sizes: '192x192', href: '/img/favicon/android-chrome-192x192.png'},
    {rel: 'icon', type: 'image/png', sizes: '512x512', href: '/img/favicon/android-chrome-512x512.png'},

    // Apple
    {rel: 'apple-touch-icon', href: '/img/favicon/apple-touch-icon.png'}
  ]
})
// const {initialize} = useGtag()
// initialize();
// useTrackEvent('page_view')
</script>