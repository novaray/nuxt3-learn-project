<script setup lang="ts">
interface Props {
  title: string;
}
defineProps<Props>();
</script>

<template>
  <div class="text-h4">{{ title }}</div>
</template>
