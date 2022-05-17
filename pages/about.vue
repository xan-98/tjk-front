<template>
    <div class="about">
        <div class="c-header">
            <div class="container">
                <div class="breadcrumbs">
                    <ul>
                        <li>
                            <n-link to="/">
                                Baş sahypa
                            </n-link>
                        </li>
                        <li>
                            Biz barada
                        </li>
                    </ul>
                </div>

                <h3>Biz barada</h3>
            </div>
        </div>
        
        <div class="content">
            <div class="container">
                <div class="c-row">
                    <div class="images">
                        <img :src=" data.image" alt="">
                        <img :src=" data.image1" alt="">
                    </div>

                    <div class="right-col">
                        <h4>{{data["title_" + $store.state.currentLang] ? data["title_" + $store.state.currentLang]: data.title}}</h4>
                        <div class="description" v-html='data["description_" + $store.state.currentLang] ? data["description_" + $store.state.currentLang]: data.description'>
                            
                        </div>
                    </div>

                    <div class="bg-color"></div>
                </div>
            </div>
        </div>

        <div class="map-show">
            <div class="container">
                <img src="~/assets/img/locs.png" alt="locations">
                <div class="text">
                    <h3>Dükanlaryň salgylary</h3>
                    <a href="#">Kartada görmek</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {

  data() {
    return {
      data: {},
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      "/other/about/3"
    );
    this.data = res.data;
  },
}
</script>

<style>
</style>