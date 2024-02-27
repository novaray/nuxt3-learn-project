// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt'],
  i18n: {
    locales: ['en', 'ko'], // used in URL path prefix
    defaultLocale: 'ko',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },
  quasar: {
    plugins: ['Notify'],
    config: {
      notify: {
        position: 'top-right'
      }
    }
  },
  imports: {
    // presets: [
    //   {
    //     from: 'vue-i18n',
    //     imports: ['useI18n']
    //   }
    // ]
  },
  ssr: true, // default
  app: {
    head: {
      title: 'Vue & Nuxt 강의',
      meta: [
        {
          name: 'description',
          content: '짐코딩 Vue & Nuxt 강의입니다.'
        }
      ]
    }
  },
  runtimeConfig: {
    authCookieName: '__user',
    jwtSecretKey: 'supersecretkey',
    public: {
      clientConfigValue: 'test'
    }
  }
});
