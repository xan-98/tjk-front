<template>
  <div class="product-single">
    <div class="bar">
      <div class="item fav-s" @click="addFavorite()" :class="{ active: isFav }">
        <BIconHeart />
      </div>
      <NuxtLink :to="'/products/detail/' + product.id" class="item cart-s">
        <BIconCart />
      </NuxtLink>
    </div>
    <NuxtLink :to="'/products/detail/' + product.id">
      <b-skeleton-img v-if="isLoad == false" :height="height ? height : '370px'" animation="fade"></b-skeleton-img>
      <img v-show="isLoad" @load="test" :src="product.images[0].image" :height="height ? height : '370px'" alt="product" />

      <div class="name">
        {{
          product["title_" + $store.state.currentLang]
            ? product["title_" + $store.state.currentLang]
            : product.title
        }}
      </div>
      <div class="price">{{ product.price }} TMT</div>

      <div v-if="category" class="category-s">
        {{
          product.category["title_" + $store.state.currentLang]
            ? product.category["title_" + $store.state.currentLang]
            : product.category.title
        }}
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import { BIconHeart, BIconCart } from "bootstrap-vue";
export default {
  props: ["product",'category','height'],

  components: {
    BIconHeart,
    BIconCart,
  },

  data() {
    return {
      isFav: false,
      isLoad: false
    };
  },

  mounted() {
    this.isFav = this.isFavoriteFunction();
  },
  methods: {
    test(){
      this.isLoad = true;
      console.log(this.isLoad);
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
      if(this.$auth.loggedIn)
      if (this.isFav) {
        this.RemoveFavorite();
      } else {

        this.isFav = true;
        this.$axios
          .post("/addfavorite", { product_id: this.product.id })
          .then(async (res) => {
            const favs = await this.$axios.get("/getfavorite");
            this.$store.commit("setFavorites", favs.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      else
      this.toast(this.$tr.t('Birinji ulgami giriň'))
    },

    isFavoriteFunction() {
      var result = this.$store.state.favorites.find((obj) => {
        return obj.product.id == this.product.id;
      });
      return result ? true : false;
    },

    RemoveFavorite() {
      this.isFav = false
      this.$axios
        .delete("/addfavorite", { data: { product_id: this.product.id } })
        .then(async (res) => {
          const favs = await this.$axios.get("/getfavorite");
          this.$store.commit("setFavorites", favs.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>