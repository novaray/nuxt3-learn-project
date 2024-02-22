<script setup lang="ts"></script>

<template>
  <q-page padding>
    <div class="q-my-xl text-center">
      <PageTitle title="About" />
      <pageDescription
        description="Vue & Nuxt Mastery Class 웹은 Nuxt3로 만들어졌습니다."
      />
      <div class="column">
        <RouterLink to="/">RouterLink Home</RouterLink>
        <RouterLink to="https://youtube.com/@gymcoding">
          RouterLink Youtube
        </RouterLink>
        <br />
        <NuxtLink to="/">NuxtLink Home</NuxtLink>
        <NuxtLink to="https://youtube.com/@gymcoding">
          NuxtLink Youtube
        </NuxtLink>
      </div>
    </div>
  </q-page>
</template>
