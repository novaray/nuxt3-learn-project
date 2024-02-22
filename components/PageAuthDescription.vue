<script setup lang="ts">
interface Props {
  description: string;
}
defineProps<Props>();
</script>

<template>
  <p class="text-subtitle1 q-mb-xl">{{ description }}</p>
</template>
