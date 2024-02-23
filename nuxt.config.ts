// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@pinia/nuxt'],
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
  ssr: true // default
});
