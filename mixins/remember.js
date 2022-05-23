export default {
    mounted() {
      let authExpire = this.$cookies.get('auth_expire');
      if (authExpire) {
        let authRefreshTokenLocal = this.$cookies.get('auth._refresh_token.local')
        let authTokenLocal = this.$cookies.get('auth._token.local')
        let authStrategy = this.$cookies.get('auth.strategy')
        this.$cookies.set('auth._refresh_token.local', authRefreshTokenLocal, {
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
    }
  }