<template>
  <div class="new-products" style="padding-top: 0">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/main">
              {{ $tr.t("Baş sahypa", $store.state.currentLang) }}
            </NuxtLink>
          </li>
          <li>
            {{ $tr.t("Täze gelen harytlar") }}
          </li>
        </ul>
      </div>

      <div class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-sm-12 col-md-4 col-lg-3"
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
  mounted() {
    this.$store.commit("change_first");
  },
  async fetch() {
    const res = await this.$axios.get(
      "/products/products/?ordering=-created&limit=12"
    );
    this.data = res.data.results;
  },
};
</script>

<style></style>
