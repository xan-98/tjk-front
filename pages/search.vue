<template>
  <div class="search-page new-products" style="padding-top: 0">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/"> Baş sahypa </NuxtLink>
          </li>
          <li>Gözleg</li>
          <li>
            {{ this.$route.query.search }}
          </li>
        </ul>
      </div>
    <br>
      <div v-if="data.length" class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-sm-12 col-md-4 col-lg-3"
        >
          <ProductSingle :product="item" />
        </div>
      </div>

      <h3 v-else class="text-center">Tapylmady: {{this.$route.query.search}}</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
    };
  },

  async fetch() {
    
    const res = await this.$axios.get(
      "/products/products/?search=" + this.$route.query.search
    );
    this.data = res.data.results;
  },
  computed: mapState(["search"]),
  mounted() {},

  watch: {
   async search(newValue, oldValue) {
      console.log(newValue, " ", oldValue);
      const res = await this.$axios.get(
        "/products/products/?search=" + this.$store.state.search
      );
      this.data = res.data.results;
    },
  },
};
</script>

<style lang="scss">
    .search-page{
        h3{
            margin: 100px;
        }
    }
</style>