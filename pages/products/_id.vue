<template>
  <div class="pr-list">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/"> Baş sahypa </NuxtLink>
          </li>
          <li>
            {{
              category["title_" + $store.state.currentLang]
                ? category["title_" + $store.state.currentLang]
                : category.title
            }}
          </li>
        </ul>
      </div>

      <div class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-md-4 col-sm-6 py-4"
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
      category:this.$store.getters.getCatById(this.$route.params.id)
    };
  },

  async fetch() {
    const res = await this.$axios.get(
      "/products/products/?category=" + this.$route.params.id
    );
    this.data = res.data.results;
  },
};
</script>

<style>
</style>