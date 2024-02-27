// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  quasar: {
    plugins: ['Notify'],
    config: {
      notify: {
        position: 'top-right'
      }
    }
  },
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
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
  }
});
