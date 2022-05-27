<template>
  <div class="slider" v-if="active">
    <client-only>
      <agile
        :navButtons="false"
        :autoplay="true"
        :infinite="true"
        :autoplaySpeed="5000"
        ref="carusel"
      >
        <div class="slide" v-for="(slide, index) in data" :key="index">
          <div class="wrapper">
            <img :src='slide["image_" + $store.state.currentLang]
                      ? slide["image_" + $store.state.currentLang]
                      : slide.image' 
            alt="" />
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