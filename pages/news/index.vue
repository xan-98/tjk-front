<template>
  <div class="news-last" style="padding-top: 1px">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/"> {{ $tr.t("Baş sahypa") }} </NuxtLink>
          </li>

          <li>{{ $tr.t("Täzelikler") }}</li>
        </ul>
      </div>

      <Loading v-if="isLoading" :height="300" />
      <div v-else class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-sm-6 col-md-4 py-2 mb-3"
        >
          <NuxtLink :to="'/news/' + item.id" class="news-single">
            <b-skeleton-img
              v-if="!item.load"
              height="300px"
              animation="fade"
            ></b-skeleton-img>
            <img
              v-show="item.load"
              @load="setLoad(index)"
            
              :src="item.image"
              alt="News"
            />

            <div class="text">
              <div class="title">
                {{
                  item["title_" + $store.state.currentLang]
                    ? item["title_" + $store.state.currentLang]
                    : item.title
                }}
              </div>

              <div class="description" v-html='item["description_" + $store.state.currentLang] ? item["description_" + $store.state.currentLang]: item.description'>
              </div>

              <div class="date">{{ item.created_at }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <br />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      currentPage: 1,
      rows: 0,
      isLoading: true,
      perPage: 9,
    };
  },

  async fetch() {
    const res = await this.$axios.get(
      `/news/tazeliks/?ordering=-created_at&limit=${this.perPage}`
    );
    this.data = res.data.results;
    this.rows = res.data.count;
    this.isLoading = false;
  },

  methods: {
    async changePagination(v) {
      this.isLoading = true;
      const res = await this.$axios.get(
        `/news/tazeliks/?ordering=-created_at&limit=${this.perPage}&offset=${
          this.perPage * (v - 1)
        }`
      );
      this.data = res.data.results;

      this.isLoading = false;
    },

    setLoad(index) {
      this.data[index].load = true;

      this.$forceUpdate();
    },
  },
};
</script>

<style>
</style>