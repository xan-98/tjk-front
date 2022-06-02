<template>
  <div class="news-last">
    <div class="container">

      <div class="title">
        <h3>{{ $tr.t('Soňky täzelikler')}}</h3>
        <a href="/news" class="link">{{ $tr.t('Hemmesini görkez')}}</a>
      </div>

      <div class="row">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-sm-6 col-md-4 py-2"
        >
          <NuxtLink :to="'/news/' + item.id" class="news-single">
            <b-skeleton-img v-if="! item.load" height="300px" animation="fade"></b-skeleton-img>
            <img @load="setLoad(index)"  v-show="item.load" :src="item.image" alt="News" />
          
          <div class="text">
              <div class="title">
                {{
                  item["title_" + $store.state.currentLang]
                    ? item["title_" + $store.state.currentLang]
                    : item.title
                }}
              </div>

              <div class="description">
                {{
                  item["description_" + $store.state.currentLang]
                    ? item["description_" + $store.state.currentLang]
                    : item.description
                }}
              </div>

              <div class="date">{{ item.created_at }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },

  async fetch() {
    const res = await this.$axios.get(
      "/news/tazeliks/?ordering=-created_at&limit=3"
    );
    this.data = res.data.results;
  },

  methods:{
    setLoad(index){
      this.data[index].load = true
      
      this.$forceUpdate()
    }
  }
};
</script>

<style>
</style>