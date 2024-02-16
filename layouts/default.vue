<script setup lang="ts">
const pageContainerStyle = computed(() => ({
  maxWidth: '1080px',
  margin: '0 auto'
}));
</script>

<template>
  <q-layout
    view="hHh lpR fFf"
    class="bg-grey-2"
  >
    <q-header
      elevated
      class="bg-dark text-white"
    >
      <q-toolbar>
        <q-toolbar-title>Vue & Nuxt Mastery Course</q-toolbar-title>
        <NuxtLink
          v-slot="{ navigate }"
          custom
          to="/"
        >
          <q-btn
            stretch
            flat
            no-caps
            label="Home"
            @click="navigate"
          />
        </NuxtLink>
        <q-separator
          dark
          vertical
        />
        <NuxtLink
          v-slot="{ navigate }"
          custom
          to="/about"
        >
          <q-btn
            stretch
            flat
            no-caps
            label="About"
            @click="navigate"
          />
        </NuxtLink>
      </q-toolbar>
    </q-header>
    <q-page-container :style="pageContainerStyle">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>
