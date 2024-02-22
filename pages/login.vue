<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only']
});

const handleLoginSuccess = () => {
  const { isAdmin } = useAuthUser();
  const redirect = isAdmin.value ? '/admin' : '/';
  return navigateTo(redirect);
};
</script>

<template>
  <q-page padding>
    <div class="flex flex-center column q-pt-xl">
      <PageAuthTitle title="Login" />
      <PageAuthDescription description="hello :)" />
      <FormLogin
        style="width: 400px"
        @success="handleLoginSuccess"
      />
    </div>
  </q-page>
</template>
