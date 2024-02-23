export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = useAuthenticated();

  if (isAuthenticated.value) {
    if (process.server) {
      return navigateTo('/');
    }

    return abortNavigation();
  }

  // if (!isAuthenticated.value) {
  //   return navigateTo('/login');
  // }
});
