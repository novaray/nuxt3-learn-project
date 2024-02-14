<script setup lang="ts">
interface Props {
  thumbnail: string;
  title: string;
  subtitle: string;
}

defineProps<Props>();

const emits = defineEmits<{
  click: [];
}>();
const onClick = () => emits('click');
</script>

<template>
  <q-card
    class="my-card"
    @click="onClick"
  >
    <img :src="thumbnail" />

    <q-card-section>
      <div class="text-h6 ellipsis">{{ title }}</div>
      <div class="text-subtitle2 ellipsis text-grey-8">
        {{ subtitle }}
      </div>
    </q-card-section>
  </q-card>
</template>
