<template>
  <div class="video-and-news py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="video">
            <video src=""></video>
          </div>
        </div>
          
        <div class="col-md-6">
          <div class="last-news">
            <div class="title">
              <h3>{{ $tr.t("Soňky täzelikler") }}</h3>
  
              <a href="/news" class="link">{{ $tr.t("Hemmesini görkez") }}</a>
            </div>
  
            <div class="list">
              <div v-for="(item, index) in data" :key="index" class="item py-2">
                <NuxtLink :to="'/news/' + item.id">
                  <div class="row">
                    
                    <div class="col-md-2">
                      <b-skeleton-img v-if="!item.load" height="100px" animation="fade"></b-skeleton-img>
                      <img @load="setLoad(index)" v-show="item.load" :src="item.image" alt="News" />
                    </div>

                    <div class="col-md-10">
                      <div class="text">
                        <div class="title">
                          {{
                            item["title_" + $store.state.currentLang]
                              ? item["title_" + $store.state.currentLang]
                              : item.title
                          }}
                        </div>
      
                        <div class="date">{{ item.created_at }}</div>
                      </div>
                    </div>

                  </div>
                </NuxtLink>
              </div>
  
            </div>
  
          </div>

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

  methods: {
    setLoad(index) {
      this.data[index].load = true;

      this.$forceUpdate();
    },
  },
};
</script>

<style></style>
