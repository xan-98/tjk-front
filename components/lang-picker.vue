<template>
  <div class="lang-picker flex items-center ml-5">
    <div class="dropdown group">
      <button class="dropbtn uppercase">
        <span>{{ $store.state.currentLang }}</span>
        <BIconCaretDownFill
          class="group-hover:rotate-180 transition-all duration-200"
        ></BIconCaretDownFill>
      </button>
      <transition name="page">
        <div
          class="dropdown-content z-50 hidden group-hover:block absolute border-2 border-gray-500 py-2 px-3 bg-white"
        >
          <a href="#" @click="changeLang('tm')">
            <span class="hover:underline">TM</span>
          </a>

          <a href="#" @click="changeLang('en')">
            <span class="hover:underline">EN</span>
          </a>

          <a class="" href="#" @click="changeLang('ru')">
            <span class="hover:underline">RU</span>
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  BIconTelephone,
  BIconEnvelope,
  BIconCaretDownFill,
} from "bootstrap-vue";
export default {
  components: {
    BIconTelephone,
    BIconEnvelope,
    BIconCaretDownFill,
  },
  data() {
    return {
      langs: {
        tm: "Türkmen",
        en: "English",
        ru: "Russian",
      },
    };
  },
  methods: {
    changeLang(l) {
      this.$store.commit("change_Lang", l);
      this.$tr.setCurrentLang(l);
    },
  },

  mounted() {
    var local_lang = window.localStorage.getItem("lang");
    if (["tm", "en", "ru"].includes(local_lang)) {
      this.$store.commit("change_Lang", local_lang);
      this.$tr.setCurrentLang(local_lang);
    }
  },
};
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
