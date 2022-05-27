<template>
  <div>
    <footer>
      <div class="container">
        <div class="c-row">
          <div class="c-col">
            <NuxtLink to="/" class="logo">
              <img src="/logo.png" alt="Logo" />
              <h1>
                {{ $tr.t('Türkmenbaşy') }}
                <div>{{ $tr.t("jins toplumy")}}</div>
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
              <div class="d-flex">
                <a :href="'tel:' + $store.state.info.phone2">
                  <BIconTelephone style="opacity: 0" />{{
                    $store.state.info.phone2
                  }}
                </a>
                &nbsp;&nbsp;
                <a :href="'tel:' + $store.state.info.phone3">
                  {{ $store.state.info.phone3 }}
                </a>
              </div>
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
            <div class="title">{{ $tr.t('Kategoriýalar')}}</div>

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
            <div class="title">{{ $tr.t('Maglumat')}}</div>

            <ul>
              <li>
                <NuxtLink to="/about">{{ $tr.t('Biz barada') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/help-order"
                  >{{ $tr.t('Saýtymyzdan nädip sargamaly')}}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/help-payment"
                  >{{ $tr.t('Töleg tertibi we eltip bermek')}}</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div class="c-col list">
            <NuxtLink class="title" to="/contact">{{ $tr.t('Habarlaşmak')}}</NuxtLink>

            <form @submit="onSubmitForm">
              <div>
                <label for="name">{{ $tr.t('Adyňyz')}}</label>
                <input v-model="contactInfo.name" type="text" required />
              </div>
              <div>
                <label for="email">{{ $tr.t('Email')}}</label>
                <input v-model="contactInfo.email" type="email" required />
              </div>

              <label for="note">{{ $tr.t('Bellik')}}</label>
              <textarea v-model="contactInfo.message"  rows="3" required></textarea>
              <button type="submit">{{ $tr.t('Ugrat')}}</button>
            </form>

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
        &copy; {{ new Date().getFullYear() }} <b>{{ $tr.t('Ähli hukuklar goragly')}}.</b>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconTelephone, BIconEnvelope, BIconPrinter } from "bootstrap-vue";
export default {
  components: { BIconTelephone, BIconEnvelope, BIconPrinter },

  data() {
    return {
      valid: false,
      contactInfo: {
        email: "",
        name: "",
        message: "",
      },
    };
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

    async onSubmitForm(event) {
      event.preventDefault();

      this.$axios
        .post("/createcontact", this.contactInfo)
        .then((res) => {
          this.toast(this.$tr.t("Iberildi"));

          this.contactInfo = {
            email: "",
            username: "",
            message: "",
          };
        })
        .catch((err) => {
          this.toast(this.$tr.t("Ýalňyşlyk bar täzeden barlaň"));
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
footer {
  label {
    margin: 5px 0 0 0;
  }

  form {
    button {
      text-align: center;
      background: #181818;
      color: #ffffff;
      border-radius: 5px;
      padding: 2px 10px;

      &:hover {
        color: #181818;
        background: #ffffff;
      }
    }
  }
  input,
  textarea {
    border: 1px solid rgba(0, 0, 0, 0.137);
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
    border-radius: 5px;
  }
}
</style>