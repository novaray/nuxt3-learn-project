<script setup lang="ts">
const title = ref('Nuxt Study Project');
const description = ref('Nuxt.js study project by gymcoding(inflearn)');
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogImage: '/img/og-image.png'
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
