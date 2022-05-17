<template>
  <div>
    <pre-header />

    <div :class="{ header: true, active: isActive }">
      <div class="container">
        <div class="c-row">
          <div class="menu-btn" @click="isActive = !isActive">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>

          <NuxtLink to="/" class="logo">
            <img src="/logo.png" alt />
            <h1>
              Türkmenbaşy
              <span>jins toplumy</span>
            </h1>
          </NuxtLink>
          <div class="right-col">
            <form @submit="goSearch" class="search">
              <input v-model="search" type="text" placeholder="Gözle" />
              <BIconSearch @click="goSearch"/>
            </form>

            <div class="action-bar">
              <div class="user">
                <NuxtLink v-if="this.$auth.loggedIn" to="/profile">
                  <b-icon-person></b-icon-person>
                  <div class="title">{{ $auth.user.first_name }}</div>
                </NuxtLink>

                <NuxtLink v-else to="/login">
                  <b-icon-person></b-icon-person>
                  <div class="title">Login</div>
                </NuxtLink>
              </div>

              <NuxtLink to="/favorites" class="favorite">
                <b-icon-heart></b-icon-heart>
                <div class="title">{{ $tr.t('Halananlar') }}</div>
              </NuxtLink>

              <NuxtLink to="/cart" class="cart">
                <img src="~/assets/img/cart-bag.svg" alt="cart" />
                <div class="title">Cart</div>
                <div v-if="$store.state.cart.length" class="count">{{ $store.state.cart.length }}</div>
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="#" class="m-cart">
            <img src="~/assets/img/cart-bag.svg" alt="cart" />
            <div class="count">1</div>
          </NuxtLink>
        </div>

        <div class="m-search">
          <input type="text" name="search" placeholder="Gözle" />
          <button class="s-btn">
            <BIconSearch />
          </button>
        </div>

        <nav>
          <ul>
            <li v-for="(cat, index) in $store.state.category" :key="index">
              <NuxtLink :to="'/products/' + cat.id">{{
                cat["title_" + $store.state.currentLang]
                  ? cat["title_" + $store.state.currentLang]
                  : cat.title
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/new-products" class="new-color">täze önümler</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
  <!-- MOBILE ############################################################################## -->
      <div class="menu-slide">
        <div class="close-btn" @click="isActive = !isActive">x</div>
        <ul>
          <li v-for="(cat, index) in $store.state.category" :key="index">
            <NuxtLink :to="'/' + cat.slug">{{
              cat["title_" + $store.state.currentLang]
                ? cat["title_" + $store.state.currentLang]
                : cat.title
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/new-products" class="new-color">Täze önümler</NuxtLink>
          </li>
        </ul>

        <div class="action-bar">
          <NuxtLink to="/profile" class="profile-icon" v-if="this.$auth.loggedIn">
            <b-icon-person></b-icon-person>
            <span>{{ $auth.user.first_name }}</span>
          </NuxtLink>

          <NuxtLink to="/login" class="profile-icon" v-else>
            <b-icon-person></b-icon-person>
            <span>Login</span>
          </NuxtLink>

          <NuxtLink to="/favorites" class="favorit-icon">
            <BIconHeart />
            <span>Favorite</span>
          </NuxtLink>
        </div>

        <!-- <div class="langs">
          <img src="~/assets/img/flags/tm.png" alt="TM" />
          <img src="~/assets/img/flags/ru.png" alt="ru" />
          <img src="~/assets/img/flags/en.png" alt="en" />
        </div> -->

        <ul class="contact-l">
          <li>
            <a :href="'tel:'+$store.state.info.phone"> <BIconTelephone />{{ $store.state.info.phone }} </a>
          </li>
          <li>
            <a :href="'mailto:'+$store.state.info.email">
              <BIconEnvelope />{{ $store.state.info.email }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="bg-shadow"
      v-show="isActive"
      @click="isActive = !isActive"
    ></div>
  </div>
</template>

<script>
import {
  BIconSearch,
  BIconHeart,
  BIconPerson,
  BIconTelephone,
  BIconEnvelope,
} from "bootstrap-vue";
import PreHeader from "./PreHeader.vue";
export default {
  components: {
    PreHeader,
    BIconSearch,
    BIconHeart,
    BIconPerson,
    BIconTelephone,
    BIconEnvelope,
  },

  data() {
    return {
      isActive: false,
      search:''
    };
  },
  methods: {
    // open(){
    //   console.log(this);
    // }

    goSearch(event){
      event.preventDefault();
      this.$store.commit('setSearch', this.search)
      this.$router.push('/search?search=' + this.search)
    }
  },

  mounted() {
    // Close modal with 'esc' key
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.isActive = false;
      }
    });
  },

  async fetch() {
    const res = await this.$axios.get("/products/categories");
    this.$store.commit('setCategory', res.data.results)

    if(this.$auth.loggedIn){
      const favs = await this.$axios.get("/getfavorite");
      this.$store.commit('setFavorites', favs.data.results)
    }
  },
};
</script>

<style>
</style>