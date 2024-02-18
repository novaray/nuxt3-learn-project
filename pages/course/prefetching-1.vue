<script lang="ts">
console.log('prefetching-1.vue');
export default {};
</script>

<template>
  <q-page padding>
    <div class="text-center q-py-xl">
      <div class="text-h4">
        {{ $route.path }}
      </div>
    </div>
  </q-page>
</template>
