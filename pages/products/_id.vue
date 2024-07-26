<template>
  <div class="pr-list">
    <Slider />
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/"> {{ $tr.t("Baş sahypa") }} </NuxtLink>
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

      <div v-if="!isLoading" class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-md-4 col-sm-6 py-4"
        >
          <ProductSingle :product="item" height="520px" />
        </div>
      </div>

      <Loading v-else :height="300" />

      <b-pagination
        v-if="rows > perPage"
        class="justify-content-center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        @change="changePagination"
        size="lg"
      ></b-pagination>
    </div>
    <Banner />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      data: [],
      category: this.$store.getters.getCatById(this.$route.params.id),
      currentPage: 1,
      rows: 0,
      perPage: 9,
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      `/products/products/?category=${this.$route.params.id}&limit=${this.perPage}`
    );
    this.data = res.data.results;
    this.isLoading = false;
    this.rows = res.data.count;
  },
  mounted() {
    this.$store.commit("change_first");
  },
  methods: {
    async changePagination(v) {
      this.isLoading = true;
      const res = await this.$axios.get(
        `/products/products/?category=${this.$route.params.id}&limit=${
          this.perPage
        }&offset=${this.perPage * (v - 1)}`
      );
      this.data = res.data.results;
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
