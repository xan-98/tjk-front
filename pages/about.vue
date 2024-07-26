<template>
  <div class="about">
    <div class="c-header">
      <div class="container">
        <div class="breadcrumbs">
          <ul>
            <li>
              <n-link to="/">
                {{ $tr.t("Baş sahypa") }}
              </n-link>
            </li>
            <li>
              {{ $tr.t("Biz barada") }}
            </li>
          </ul>
        </div>

        <h3>{{ $tr.t("Biz barada") }}</h3>
      </div>
    </div>
    <Loading v-if="isLoading" :height="500"></Loading>
    <div v-else class="content">
      <div class="container">
        <div class="c-row">
          <div class="images">
            <img :src="data.image" alt="" />
            <img :src="data.image1" alt="" />
          </div>

          <div class="right-col">
            <h4>
              {{
                data["title_" + $store.state.currentLang]
                  ? data["title_" + $store.state.currentLang]
                  : data.title
              }}
            </h4>
            <div
              class="description"
              v-html="
                data['description_' + $store.state.currentLang]
                  ? data['description_' + $store.state.currentLang]
                  : data.description
              "
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="map-show">
            <div class="container">
                <img src="" alt="locations">
                <div class="text">
                    <h3>Dükanlaryň salgylary</h3>
                    <a href="#">Kartada görmek</a>
                </div>
            </div>
        </div> -->
    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      isLoading: true,
    };
  },
  async fetch() {
    const res = await this.$axios.get("/other/about/3");
    this.data = res.data;
    this.isLoading = false;
    this.$store.commit("change_first");
  },
};
</script>

<style></style>
