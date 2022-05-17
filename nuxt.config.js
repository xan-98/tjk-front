export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TJK',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/font.scss',
    '@/assets/css/other.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-agile.js',
    '~/plugins/tr.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/home',
      '~/components/main',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: 'http://localhost:8000/api/'
    // xsrfCookieName: 'csrftoken',
    // xsrfHeaderName: 'X-CSRFToken'
  },

  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/token/',
            method: 'post',
            propertyName: 'access'
          },
          user: {
            url: '/user',
            propertyName: 'user',
            method: 'get',
            autoFetch: true
          },
          logout: false,
          tokenType: 'Bearer',
        
        }
      }
    },

    redirect: {
      home: '/',
      logout: '/',
      login: '/login',
      
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-agile']
  }
}
