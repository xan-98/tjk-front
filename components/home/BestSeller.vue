<template>
  <div class="best-seller">
    <div class="container">
      <h3>{{ $tr.t('Köp satylanlar') }}</h3>

      <div class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-sm-12 col-md-4"
        >
          <ProductSingle :product="item" />
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
    const res = await this.$axios.get(
      "/products/products/?ordering=-sellcount&limit=8"
    );
    this.data = res.data.results;
  },
};
</script>

<style>
</style>