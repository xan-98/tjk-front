<template>
  <div class="new-products">
    <div class="container">
      <div class="title">
        <h3>Täze gelen harytlar</h3>
        <NuxtLink to="/new-products" class="link">Hemmesini görkez</NuxtLink>
      </div>

      <div class="row">
        <div v-for="(item, index) in data" :key="index" class="col-sm-12 col-md-4 col-lg-3">
          <ProductSingle :product="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },

  async fetch() {
    const res = await this.$axios.get("/products/products/?ordering=-created&limit=8");
    this.data = res.data.results;
  },
};
</script>

<style>
</style>