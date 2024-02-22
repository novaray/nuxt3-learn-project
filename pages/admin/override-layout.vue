<script setup lang="ts">
definePageMeta({
  layout: false
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <template #header>
        <q-header
          elevated
          class="bg-primary text-white"
        >
          <q-toolbar>
            <q-toolbar-title>Vue & Nuxt Mastery Admin</q-toolbar-title>
          </q-toolbar>
        </q-header>
      </template>
      <div class="q-my-xl text-center">
        <PageTitle title="레이아웃 재정의" />
        <pageDescription description="Admin Layout 실습을 위한 페이지입니다." />
      </div>
    </NuxtLayout>
  </div>
</template>
