<template>
  <div class="slider" v-if="active">
    <client-only>
      <div class="slide" v-for="(slide, index) in data" :key="index">
        <div class="wrapper">
          <img
            @load="setLoad(index)"
            v-show="slide.load"
            :src="
              slide['image_' + $store.state.currentLang]
                ? slide['image_' + $store.state.currentLang]
                : slide.image
            "
            alt=""
          />
          <Loading v-if="!slide.load" height="500"></Loading>
        </div>
      </div>
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
  async mounted() {},

  methods: {
    setLoad(index) {
      this.data[index].load = true;

      this.$forceUpdate();
    },
  },
};
</script>

<style></style>
