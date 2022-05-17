<template>
  <div>
    <Header />
    <Nuxt />
    <Footer/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      "/info"
    );
    this.$store.commit('setInfo', res.data.results[0])
  },
};
</script>