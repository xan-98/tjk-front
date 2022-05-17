<template>
  <div class="news-page">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/"> Baş sahypa </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/news"> Täzelikler </NuxtLink>
          </li>
          <li>{{
            data["title_" + $store.state.currentLang]
              ? data["title_" + $store.state.currentLang]
              : data.title
          }}</li>
        </ul>
      </div>

      <div class="wrapper">
        <img class="news-img" :src="data.image" alt="" />

        <div class="date">
          <BIconCalendar3 />
          {{ data.created_at }}
        </div>
        <h4 class="title">
          {{
            data["title_" + $store.state.currentLang]
              ? data["title_" + $store.state.currentLang]
              : data.title
          }}
        </h4>

        <div class="description">
          {{
            data["description_" + $store.state.currentLang]
              ? data["description_" + $store.state.currentLang]
              : data.description
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconCalendar3 } from "bootstrap-vue";
export default {
  components: {
    BIconCalendar3,
  },
  data() {
    return {
      data: {},
    };
  },

  async fetch() {
    const res = await this.$axios.get(
      "/news/tazeliks/" + this.$route.params.id
    );
    this.data = res.data;
  },
};
</script>

<style>
</style>