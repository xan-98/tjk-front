<template>
  <div class="news-page">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/"> {{ $tr.t('Baş sahypa')}} </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/news"> {{ $tr.t('Täzelikler')}} </NuxtLink>
          </li>
          <li>
            {{
              data["title_" + $store.state.currentLang]
                ? data["title_" + $store.state.currentLang]
                : data.title
            }}
          </li>
        </ul>
      </div>

      <div class="wrapper">
        <h4 class="title">
          {{
            data["title_" + $store.state.currentLang]
              ? data["title_" + $store.state.currentLang]
              : data.title
          }}
        </h4>

        <div class="panel">
          <div class="date">
            <BIconCalendar3 />
            {{ data.created_at }}
          </div>

          <div class="date">
            <BIconEye />
            {{ data.view }}
          </div>
        </div>
        <br />
        <img class="news-img" :src="data.image" alt="" />
        
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
import { BIconCalendar3, BIconEye } from "bootstrap-vue";
export default {
  components: {
    BIconCalendar3,BIconEye
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