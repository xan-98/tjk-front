<template>
  <div class="pre-header">
    <b-container>
      <div class="wrapper">
        <div class="info">
          <!-- <span class="item">
            <a :href="'tel:' + $store.state.info.phone">
              <BIconTelephone></BIconTelephone>{{ $store.state.info.phone }}
            </a>
          </span> -->

          <div class="dropdown">
            <button class="dropbtn">
              <span class="item">
                <a :href="'tel:' + $store.state.info.phone">
                  <BIconTelephone></BIconTelephone>{{ $store.state.info.phone }}
                </a>
              </span>
            </button>

            <div class="dropdown-content">
              <span class="item">
                <a :href="'tel:' + $store.state.info.phone2">
                  <BIconTelephone></BIconTelephone
                  >{{ $store.state.info.phone2 }}
                </a>
              </span>

              <span class="item">
                <a :href="'tel:' + $store.state.info.phone3">
                  <BIconTelephone></BIconTelephone
                  >{{ $store.state.info.phone3 }}
                </a>
              </span>
            </div>
          </div>

          <span class="item">
            <a :href="'mailto:' + $store.state.info.email">
              <BIconEnvelope></BIconEnvelope>{{ $store.state.info.email }}
            </a>
          </span>
        </div>

        <LangPicker />
      </div>
    </b-container>
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

<style></style>
