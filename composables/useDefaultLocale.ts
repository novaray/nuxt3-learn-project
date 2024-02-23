export const useDefaultLocale = (fallback = 'en') => {
  const locale = ref(fallback);

  if (process.server) {
    locale.value = useRequestHeaders()['accept-language'].split(';')[0].split(',')[1] || fallback;
  } else if (process.client) {
    locale.value = navigator.language.split('-')[0] || fallback;
  }

  return locale;
};
