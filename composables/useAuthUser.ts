import type { UserWithoutPassword } from '~/types/user';

// 임시로 둠.
const authUser = ref<Maybe<UserWithoutPassword>>();

export const useAuthUser = () => {
  const isAuthenticated = computed(() => !!authUser.value);
  const isAdmin = computed(() => authUser.value?.roles.includes('ADMIN'));

  return {
    authUser,
    isAuthenticated,
    isAdmin
  };
};
