<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async fetch() {
    const res = await this.$axios.get("/info");
    this.$store.commit("setInfo", res.data.results[0]);
  },

  mounted() {
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