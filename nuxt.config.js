import axios from 'axios'
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
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',

    '@nuxtjs/feed',
  ],

  feed: [
    {
      path: '/rss', // The route to your feed.
      async create(feed) {
        feed.options = {
          title: 'Türkmenbaşy jins toplumy - www.tjk.com.tm',
          link: 'https://www.tjk.com.tm/rss',
          description: '«Gap-Türkmen» ýapyk görnüşli paýdarlar jemgyýetiniň Türkmenbaşy jins toplumynynda 8-den 15 unsiýa çenli galyňlykda gök, gara, ýaşyl we goňur reňklerde ýokary hilli jins matalary öndürilýär.',
          
          image:'https://www.tjk.com.tm/logo.png',
        }

        try {
          const res = await axios.get('https://tjk.com.tm:8000/api/news/tazeliks/?ordering=-created_at&limit=10')
          const posts = res.data.results
          
          posts.forEach(post => {
            const short_desc = post.description.replace(/<[^>]*>?/gm, '').split(' ').slice(0,15).join(' ');
            var date = post.created_at.split('.')
            date = `${date[1]}.${Number(date[0])+1}.${date[2]}`
            feed.addItem({
              title: post.title,
              id: 'https://tjk.com.tm/news/' + post.id,
              link: 'https://tjk.com.tm/news/' + post.id,
              description: short_desc,
              content: post.description,
              image: post.image,
              date: new Date(date)
            })
          })
          
        } catch (error) {
          console.log(error);
        }
      },
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      // data: ['Some additional data'] // Will be passed as 2nd argument to `create` function
    }
  ],



  axios: {
    // baseURL: 'https://tjk.com.tm:8000/api/'
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

    localStorage: false,

    redirect: {
      home: '/',
      logout: '/',
      login: '/login',

    },

    cookie: {
      options: {
        sameSite: 'Strict',
        secure: true
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-agile']
  }
}
