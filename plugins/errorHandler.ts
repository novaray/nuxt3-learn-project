import { Notify } from 'quasar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (error) => {
    // console.log('vue:error', error);
    if (error instanceof Error) {
      if (process.client) {
        Notify.create({
          type: 'warning',
          message: error.message
        });
      } else {
        console.error('error: ', error.message);
      }
    }
  });

  nuxtApp.hook('vue:error', (error) => {
    // console.log('vue:error', error);
    if (error instanceof Error) {
      if (process.client) {
        Notify.create({
          type: 'negative',
          message: error.message
        });
      } else {
        console.error('error: ', error.message);
      }
    }
  });
});
