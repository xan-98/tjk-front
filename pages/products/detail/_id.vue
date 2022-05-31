<template>
  <div class="detail">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <n-link to="/"> {{ $tr.t("Baş sahypa") }} </n-link>
          </li>
          <li>
            <NuxtLink
              v-if="pr.category != undefined"
              :to="'/products/' + pr.category.id"
              >{{
                pr.category["title_" + $store.state.currentLang]
                  ? pr.category["title_" + $store.state.currentLang]
                  : pr.category.title
              }}</NuxtLink
            >
          </li>
          <li>
            {{
              pr["title_" + $store.state.currentLang]
                ? pr["title_" + $store.state.currentLang]
                : pr.title
            }}
          </li>
        </ul>
      </div>

      <div class="c-row" v-if="pr.images != undefined">
        <div class="pr-slider">
          <div class="main">
            <client-only>
              <agile
                ref="main"
                :dots="false"
                :fade="true"
                :navButtons="false"
              >
                <div
                  class="slide"
                  v-for="(img, index) in pr.images"
                  :key="index"
                >
                  <b-skeleton-img
                    v-if="!img.load"
                    height="600px"
                    animation="fade"
                  ></b-skeleton-img>
                  <img @load="setLoad(index)" v-show="img.load" :src="img.image" alt="Product" />
                </div>
              </agile>
            </client-only>
          </div>
          <div class="thumb">
            <agile
              ref="thumbnails"
              :as-nav-for="[$refs.main]"
              :slides-to-show="3"
              :dots="false"
              :navButtons="false"
              :infinite="true"
            >
              <div
                v-for="(img, index) in pr.images"
                :key="index"
                class="slide"
                @click="$refs.main.goTo(index)"
              >

                <img  :src="img.image" alt="Product" />
              </div>
            </agile>
          </div>
        </div>

        <div class="right-col">
          <!-- <div class="status">{{ $tr.t('täze') }}</div> -->
          <br />
          <div class="name">
            {{
              pr["title_" + $store.state.currentLang]
                ? pr["title_" + $store.state.currentLang]
                : pr.title
            }}
          </div>

          <div class="price">{{ pr.price }} TMT</div>

          <div class="counter">
            <div class="c-button" @click="minus">-</div>
            <input type="text" name="count" :value="pr.amount" disabled />
            <div class="c-button" @click="plus">+</div>
          </div>

          <div class="sizes">
            <div class="text">{{ $tr.t("Ölçegleri") }}:</div>

            <ul>
              <li
                v-for="(s, index) in pr.sizes"
                :key="index"
                @click="selectSize(s.title)"
              >
                <div
                  v-if="s.value > 0"
                  class="item"
                  :class="{ active: pr.activeSize == s.title ? true : false }"
                >
                  {{ s.title }}
                </div>
              </li>
            </ul>
          </div>

          <div class="action-bar">
            <button class="add-to-cart" @click="addToCart()">
              <BIconCart />
              {{ $tr.t("sebede goş") }}
            </button>

            <button
              @click="addFavorite()"
              class="add-to-fav"
              :class="{ active: isFav }"
            >
              <BIconHeart />
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="info-tab">
        <b-tabs content-class="mt-4">
          <b-tab title="Harytlary yzyna gaýtarmak we çalyşmak" active>
            <p>
              Gowy hilli harytlary yzyna gaýtarmagyň möhleti, harydyň alnan
              senesinden 3 gün. Satyn alyjy tarapyndan harytlary yzyna
              gaýtarmagyň sebäpleri aşakdakylar bolup biler: Ululygy, stili,
              reňki, uzynlygy we ş.m. gabat gelmedi. Alnan önümiň kölegesi, web
              sahypasyndaky suratdan modeliň kölegesinden tapawutlanýar Harytlar
              diňe gaplanan we ulanylmadyk, ulanylmadyk / ulanylmadyk doly
              toplumda kabul edilýär Satyn alyjy önümi markaly pikap / yzyna
              gaýtarmak nokatlaryna özbaşdak gaýtaryp biler
            </p>
          </b-tab>
          <b-tab title="Teswirler">
            <p>I'm the second</p>
          </b-tab>
        </b-tabs>
      </div> -->

      <div class="pr-other" v-if="products.length > 1">
        <h3>{{ $tr.t("Başga-da saýlaň") }}</h3>
        <div class="row">
          <div
            v-for="(item, index) in products"
            :key="index"
            v-show="item.id != pr.id && index < 3"
            class="col-sm-6 col-md-4 py-4"
          >
            <ProductSingle :product="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconCart, BIconHeart } from "bootstrap-vue";
export default {
  components: { BIconCart, BIconHeart },
  data() {
    return {
      pr: {},
      products: [],
      isFav: false,
    };
  },

  async fetch() {
    var product = await this.$axios.get(
      `/products/products/${this.$route.params.id}`
    );
    product.data.amount = 1;
    product.data.activeSize = false;
    this.pr = product.data;

    this.isFav = this.isFavoriteFunction();

    const res = await this.$axios.get(
      `/products/products/?category=${product.data.category.id}&ordering=-created&limit=4`
    );
    this.products = res.data.results;
  },
  methods: {
    selectSize(s) {
      this.pr.activeSize = s;
    },
    minus() {
      if (this.pr.amount > 1) this.pr.amount--;
    },
    plus() {
      this.pr.amount++;
    },

    addToCart() {
      if (this.pr.activeSize) {
        let size_i = this.pr.sizes.findIndex(
          (x) => x.title == this.pr.activeSize
        );

        if (this.pr.sizes[size_i].value < this.pr.amount) {
          this.toast(
            `${this.$tr.t("Bu ölçegden galan sany")}: ${
              this.pr.sizes[size_i].value
            }`
          );
        } else {
          this.pr.sizes[size_i].value -= this.pr.amount;
          console.log(this.pr);
          this.$store.commit("addCart", { ...this.pr });
          this.toast(this.$tr.t("Sebede goşuldy"));
        }
      } else {
        this.toast(this.$tr.t("Ölçeg saýlaň"));
      }
    },

    toast(message, append = false) {
      this.$bvToast.toast(`${message}`, {
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: append,
        variant: "success",
      });
    },

    addFavorite() {
      if (this.$auth.loggedIn)
        if (this.isFav) {
          this.RemoveFavorite();
        } else {
          this.isFav = true;
          this.$axios
            .post("/addfavorite", { product_id: this.pr.id })
            .then(async (res) => {
              const favs = await this.$axios.get("/getfavorite");
              this.$store.commit("setFavorites", favs.data.results);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      else this.toast(this.$tr.t("Birinji ulgama giriň"));
    },

    isFavoriteFunction() {
      var result = this.$store.state.favorites.find((obj) => {
        return obj.product.id == this.pr.id;
      });
      return result ? true : false;
    },

    RemoveFavorite() {
      this.isFav = false;
      this.$axios
        .delete("/addfavorite", { data: { product_id: this.pr.id } })
        .then(async (res) => {
          const favs = await this.$axios.get("/getfavorite");
          this.$store.commit("setFavorites", favs.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setLoad(index) {
      this.pr.images[index].load = true;

      this.$forceUpdate();
    },
  },
};
</script>

<style>
</style>