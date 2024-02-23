import type { UserWithoutPassword } from '~/types/user';
import { getUser } from '~/composables/auth/usersData';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authUser = ref<Maybe<UserWithoutPassword>>();

    const signIn = (email: string, password: string) => {
      const foundUser = getUser(email, password);

      if (!foundUser) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid email or password'
        });
      }

      setUser(foundUser);
    };

    const setUser = (user: Maybe<UserWithoutPassword>) => (authUser.value = user);

    const signOut = () => setUser(undefined);

    return {
      user: authUser,
      isAuthenticated: computed(() => !!authUser.value),
      isAdmin: computed(() => (!authUser.value ? false : authUser.value.roles.includes('ADMIN'))),
      signIn,
      signOut
    };
  },
  {
    persist: true
    // persist: {
    //   storage: persistedState.localStorage // default 값은 쿠키
    // }
  }
);
