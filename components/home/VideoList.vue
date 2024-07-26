<template>
  <div class="video-list"  >
    <div class="container">
      <div v-if="data.length">
        <ssr-carousel :show-arrows="true" :autoplay-delay="0" :slides-per-page='4' :responsive='[
          {
            maxWidth: 1280,
            slidesPerPage: 3,
          },
          {
            maxWidth: 1024,
            slidesPerPage: 2,
          },
          {
            maxWidth: 767,
            slidesPerPage: 1
          }
        ]'>
          <div v-for="(vid, index) in data" :key="index" class="slide">
            <div class="wrapper" @click="playVideo(vid)">
              <video :src="vid.video" ></video>
              <div class="play-btn">
                <BIconPlayBtn/>
              </div>
            </div>
          </div>

        </ssr-carousel>

        <div v-if="isOpen"  @keydown.esc="closeModal" tabindex="0" class="video-modal">
          <div class="close-modal" @click="closeModal">
            <BIconXLg/>
          </div>
          <video :src="currentVideo" autoplay></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BIconXLg, BIconPlayBtn, BIconPlayBtnFill} from "bootstrap-vue";
export default {
  components:{
    BIconXLg,BIconPlayBtn
  },
  data() {
    return {
      data: [],
      isOpen: false,
      currentVideo:null,
    };
  },

  async fetch() {
    const res = await this.$axios.get(
      "other/video"
    );
    this.data = res.data.results;
  },
  methods:{
    playVideo(video){
      this.isOpen = true;
      this.currentVideo=video.video
    },
    closeModal(){
      this.isOpen = false
    }

  },
  mounted() {
        let that = this;

        document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 27) {
                that.closeModal();
            }
        });
    },
};
</script>
