<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import remember from '@/mixins/remember'
export default {
  // mixins: [remember],
  data() {
    return {};
  },
  async fetch() {
    const res = await this.$axios.get("/info");
    this.$store.commit("setInfo", res.data.results[0]);
  },

  mounted() {

     let authExpire = this.$cookies.get('auth_expire');
    if (authExpire) {
      let authRefreshTokenLocal = this.$cookies.get('auth._token_expiration.local')
      let authTokenLocal = this.$cookies.get('auth._token.local')
      let authStrategy = this.$cookies.get('auth.strategy')
      this.$cookies.set('auth._token_expiration.local', authRefreshTokenLocal, {
            path: "/",
            maxAge: 60 * 60 * 24 * 60,
          })
      this.$cookies.set('auth._token.local', authTokenLocal, {
            path: "/",
            maxAge: 60 * 60 * 24 * 60,
          })
      this.$cookies.set('auth.strategy', authStrategy, {
            path: "/",
            maxAge: 60 * 60 * 24 * 60,
          })
    }



    if (!process.client) return;
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.$store.commit("setCart", JSON.parse(savedCart));
    }




  
   
  
  },

  // watch: {
  //   "$store.state.cart": function () {
  //     console.log(this.$store.state.cart);
  //   },
  // },
};
</script>