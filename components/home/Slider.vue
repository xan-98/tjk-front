<template>
  <div class="slider" v-if="active">
    <client-only>
      <agile
        :navButtons="false"
        :autoplay="false"
        :infinite="true"
        ref="carusel"
      >
        <div class="slide" v-for="(slide, index) in data" :key="index">
          <div class="wrapper">
            <img :src="slide.image" alt="" />
            <div class="text">
              <div class="container">
                <h2 class="title" @click="active = !active">
                  {{
                    slide["title_" + $store.state.currentLang]
                      ? slide["title_" + $store.state.currentLang]
                      : slide.title
                  }}
                </h2>
                <div class="sub-title">
                  {{
                    slide["title_" + $store.state.currentLang]
                      ? slide["title_" + $store.state.currentLang]
                      : slide.title
                  }}
                </div>

                <NuxtLink :to="slide.link" class="link">Doly maglumat</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </agile>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      active: false,
    };
  },

  async fetch() {
    const res = await this.$axios.get("/slides");
    this.data = res.data.results;
    this.active = true;
  },
  async mounted() {
 
  },
};
</script>

<style>
</style>