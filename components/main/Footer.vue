<template>
  <div>
    <footer>
      <div class="container">
        <div class="c-row">
          <div class="c-col">
            <NuxtLink to="/" class="logo">
              <img src="/logo.png" alt="Logo" />
              <h1>
                Türkmenbaşy
                <div>jins toplumy</div>
              </h1>
            </NuxtLink>
            <div class="contacts">
              <a :href="'tel:' + $store.state.info.phone">
                <BIconTelephone />{{ $store.state.info.phone }}
              </a>
              <a :href="'mailto:' + $store.state.info.email">
                <BIconEnvelope></BIconEnvelope>{{ $store.state.info.email }}
              </a>
            </div>
          </div>

          <div class="c-col list">
            <div class="title">Kategoriýalar</div>

            <ul>
              <li v-for="(cat, index) in $store.state.category" :key="index">
                <NuxtLink :to="'/products/' + cat.id">{{
                  cat["title_" + $store.state.currentLang]
                    ? cat["title_" + $store.state.currentLang]
                    : cat.title
                }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="c-col list">
            <div class="title">Informasiýa</div>

            <ul>
              <li>
                <NuxtLink to="/about">Biz barada</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact">Habarlaşmak</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/help-order"
                  >Saýtymyzdan nädim sargamaly</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/help-payment"
                  >Töleg tertibi we eltip bermek</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div class="c-col newsletter">
            <div>
              Habar býulletenimize ýazylyň we ilkinji satyn alanyňyzdan 10%
              arzanladyň
            </div>

            <form action="#" class="wrapper">
              <input type="text" name="email" placeholder="E-mail adresiňiz" />
              <button>Ugradyň</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
    <div class="copyright">
      <div class="container">
        Copyright © {{ new Date().getFullYear() }} All rights reserved. Powered by
      </div>
    </div>
  </div>
</template>

<script>
import { BIconTelephone, BIconEnvelope } from "bootstrap-vue";
export default {
  components: { BIconTelephone, BIconEnvelope },
};
</script>

<style>
</style>