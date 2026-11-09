export default {
  ssr: false,

  head: {
    titleTemplate: '%s ',
    title: 'ChenjiLoop',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'noindex,nofollow' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
  },

  css: [],

  plugins: [
    '@/plugins/axios-jwt.js',
    '@/plugins/chart.js'
    // Note: removed mapGoogle, directionsRenderer, axios-auth (Makaazi-only)
    // If you *do* use Google Maps anywhere, uncomment mapGoogle below:
    // '@/plugins/mapGoogle.client.js',
  ],

  router: {
  },

  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://habahabaserver-production.up.railway.app/api/v1'
  },

  components: true,

  googleFonts: {
    download: true,
    families: { Lato: true },
    display: 'Lato'
  },

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
    '@nuxtjs/moment',
    '@nuxtjs/dayjs'
  ],

  moment: { timezone: false },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dayjs'
  ],

  axios: {
    baseURL: process.env.API_BASE_URL || 'https://habahabaserver-production.up.railway.app/api/v1',
    credentials: false
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary:   '#2563eb',
          accent:    '#3b82f6',
          secondary: '#0f172a',
          info:      '#3B82F6',
          warning:   '#F59E0B',
          error:     '#DC2626',
          success:   '#10B981',
          background: '#f8fafc'
        },
        dark: {
          primary:   '#2563eb',
          accent:    '#3b82f6',
          secondary: '#0f172a',
          info:      '#3B82F6',
          warning:   '#F59E0B',
          error:     '#DC2626',
          success:   '#10B981',
          background: '#0f172a'
        }
      }
    }
  },

  build: {}
}