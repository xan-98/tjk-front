<template>
  <div class="cart-hover">
    <div
      v-for="(product, index) in $store.state.cart.slice(0,3).reverse()"
      :key="index"
      class="wrapper border-bottom"
    >
      <img :src="product.images[0].image" alt="" />
      <div class="text">
        <div class="title">
          {{
            product["title_" + $store.state.currentLang]
              ? product["title_" + $store.state.currentLang]
              : product.title
          }}
        </div>
        <div class="size">{{ product.activeSize }}</div>
      </div>

      <div class="amount">x {{ product.amount }}</div>

      <div @click="$store.commit('deleteCart', product)" class="remove">
        <BIconXCircle />
      </div>
    </div>

    <div v-if="$store.state.cart.length > 3" class="all">
      <NuxtLink to="/cart"> All </NuxtLink>
    </div>
  </div>
</template>

<script>
import { BIconXCircle } from "bootstrap-vue";
export default {
  components: { BIconXCircle },
};
</script>

<style>
</style>