<template>
  <div class="pr-list">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/main">
              {{ $tr.t("Baş sahypa", $store.state.currentLang) }}
            </NuxtLink>
          </li>
          <li>{{ $tr.t("Halananlar") }}</li>
        </ul>
      </div>

      <div class="row">
        <div
          v-for="(item, index) in $store.state.favorites"
          :key="index"
          class="col-md-4 col-sm-6 py-4"
        >
          <ProductSingle :product="item.product" />
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
  //   async fetch() {
  //     const res = await this.$axios.get("getfavorite");
  //     this.data = res.data.results;
  //   },
};
</script>

<style></style>
