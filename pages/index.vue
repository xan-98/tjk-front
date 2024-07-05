<template>
  <div>
    <div class="flex w-full gap-3">
      <NuxtLink to="/products/1" class="w-1/2 relative">
        <p
          class="absolute top-20 md:top-8 text-center w-full font-bold font-inter"
        >
          <span class="md:text-5xl text-2xl font-bold inline">&#183;</span
          ><span class="md:text-4xl text-xl"> Zenan</span>
        </p>
        <img
          class="w-full h-[130vh] object-cover md:object-cover"
          src="/ayal.jpg"
          alt=""
        />
      </NuxtLink>
      <NuxtLink to="/products/2" class="w-1/2 relative">
        <p
          class="absolute top-20 md:top-8 text-center w-full font-bold font-inter"
        >
          <span class="md:text-5xl text-2xl font-bold inline">&#183;</span
          ><span class="md:text-4xl text-xl"> Erkek</span>
        </p>
        <img
          class="w-full h-[130vh] object-cover md:object-cover"
          src="/erkek.jpg"
          alt=""
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import BestSeller from "../components/home/BestSeller.vue";
export default {
  name: "IndexPage",

  components: { BestSeller },

  mounted() {
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
        console.log(authExpire, "auth");
      }
    }, 2000);
  },
};
</script>
