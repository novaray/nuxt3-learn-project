<script setup lang="ts">
interface Props {
  description: string;
}
defineProps<Props>();
</script>

<template>
  <p class="q-mt-5m text-grey-8">{{ description }}</p>
</template>
