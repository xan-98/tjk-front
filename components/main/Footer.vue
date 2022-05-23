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
            <div class="address">
              {{
                $store.state.info["address_" + $store.state.currentLang]
                  ? $store.state.info["address_" + $store.state.currentLang]
                  : $store.state.info.address
              }}
            </div>
            <div class="contacts">
              <a :href="'tel:' + $store.state.info.phone">
                <BIconTelephone />{{ $store.state.info.phone }}
              </a>

              <a :href="'tel:' + $store.state.info.phone2">
                <BIconTelephone style="opacity: 0" />{{
                  $store.state.info.phone2
                }}
              </a>

              <a :href="'tel:' + $store.state.info.phone3">
                <BIconTelephone style="opacity: 0" />{{
                  $store.state.info.phone3
                }}
              </a>
            </div>

            <div class="contacts">
              <a :href="'fax:' + $store.state.info.fax">
                <BIconPrinter></BIconPrinter>{{ $store.state.info.fax }}
              </a>
            </div>

            <div class="contacts">
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
            <div class="title">Maglumat</div>

            <ul>
              <li>
                <NuxtLink to="/about">Biz barada</NuxtLink>
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

          <div class="c-col list d-flex" style="align-items: center; text-decoration: underline;">

                <NuxtLink class="title" to="/contact">Habarlaşmak</NuxtLink>

            <!-- <div>
              Habar býulletenimize ýazylyň we ilkinji satyn alanyňyzdan 10%
              arzanladyň
            </div>

            <form action="#" class="wrapper">
              <input type="text" name="email" placeholder="E-mail adresiňiz" />
              <button>Ugradyň</button>
            </form> -->
          </div>
        </div>
      </div>
    </footer>
    <div class="copyright">
      <div class="container">
        &copy; {{ new Date().getFullYear() }} Ähli hukuklar goragly.
      </div>
    </div>
  </div>
</template>

<script>
import { BIconTelephone, BIconEnvelope, BIconPrinter } from "bootstrap-vue";
export default {
  components: { BIconTelephone, BIconEnvelope, BIconPrinter },
};
</script>

<style>
</style>