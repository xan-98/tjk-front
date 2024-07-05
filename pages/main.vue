<template>
  <div>
    <div class="index">
      <Slider />

      <NewProducts />
      <Banner />
      <BestSeller />
      <NewsLast />
    </div>
  </div>
</template>

<script>
import BestSeller from "../components/home/BestSeller.vue";
export default {
  name: "IndexPage",
  components: { BestSeller },

  mounted() {
    this.$store.commit("change_first");

    setTimeout(() => {
      let authExpire = this.$cookies.get("auth_expire");
      if (authExpire) {
        let authRefreshTokenLocal = this.$cookies.get(
          "auth._token_expiration.local"
        );
        let authTokenLocal = this.$cookies.get("auth._token.local");
        let authStrategy = this.$cookies.get("auth.strategy");
        this.$cookies.set(
          "auth._token_expiration.local",
          authRefreshTokenLocal,
          {
            path: "/",
            maxAge: 60 * 60 * 24 * 60,
          }
        );
        this.$cookies.set("auth._token.local", authTokenLocal, {
          path: "/",
          maxAge: 60 * 60 * 24 * 60,
        });
        this.$cookies.set("auth.strategy", authStrategy, {
          path: "/",
          maxAge: 60 * 60 * 24 * 60,
        });
        console.log(authExpire);
      }
    }, 2000);
  },
};
</script>
