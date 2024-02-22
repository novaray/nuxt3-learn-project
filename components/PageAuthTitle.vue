<script setup lang="ts">
interface Props {
  title: string;
}
defineProps<Props>();
</script>

<template>
  <div class="text-h2 q-mt-xl q-mb-md">{{ title }}</div>
</template>
