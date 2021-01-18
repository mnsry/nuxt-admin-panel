export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'MOS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/axios.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },

  // Vuetify Option Config (https://github.com/nuxt-community/vuetify-module)
  vuetify: {
    optionsPath: '~/plugins/vuetify.js',
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  loading: {
    color: 'blue',
    height: '2px',
  },
}
