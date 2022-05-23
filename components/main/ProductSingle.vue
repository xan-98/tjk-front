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
      <img :src="product.images[0].image" alt="product" />

      <div class="name">
        {{
          product["title_" + $store.state.currentLang]
            ? product["title_" + $store.state.currentLang]
            : product.title
        }}
      </div>
      <div class="price">{{ product.price }} TMT</div>
    </NuxtLink>
  </div>
</template>

<script>
import { BIconHeart, BIconCart } from "bootstrap-vue";
export default {
  props: ["product"],

  components: {
    BIconHeart,
    BIconCart,
  },

  data() {
    return {
      isFav: false,
    };
  },

  mounted() {
    this.isFav = this.isFavoriteFunction();
  },
  methods: {
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
      this.toast('Birinji ulgami giriň')
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