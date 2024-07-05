<template>
  <div class="profile">
    <div class="container">
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Meniň profilim" active>
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="p-image">
                    <img src="~/assets/img/profile-d.png" alt="" />
                  </div>
                </div>

                <div class="col-md-6">
                  <form @submit="onSubmitForm" class="form">
                    <div class="c-col">
                      <label for="password">{{
                        $tr.t("Açar sözi", $store.state.currentLang)
                      }}</label>
                      <input
                        v-model="userInfo.password"
                        minlength="5"
                        type="password"
                        required
                      />
                    </div>

                    <div class="c-col">
                      <label for="password">{{
                        $tr.t("Açar sözi tassykla")
                      }}</label>
                      <input
                        v-model="userInfo.confirm_password"
                        minlength="5"
                        type="password"
                        required
                      />
                    </div>

                    <button class="change" type="submit">
                      {{ $tr.t("Üýtget") }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </b-tab>
          <!-- <b-tab title="Sargytlarym">
                        <b-card-text>Tab contents 2</b-card-text>
                    </b-tab> -->
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      userInfo: {
        password: "",
        confirm_password: "",
      },
    };
  },
  mounted() {
    this.$store.commit("change_first");
  },
  methods: {
    toast(message, append = false) {
      this.$bvToast.toast(`${message}`, {
        toaster: "b-toaster-top-right",
        solid: true,
        appendToast: append,
        variant: "primary",
      });
    },

    async onSubmitForm(event) {
      event.preventDefault();

      if (this.userInfo.password !== this.userInfo.confirm_password) {
        this.toast(this.$tr.t("Parollar gabat gelmedi!"));
        return false;
      }

      this.$axios
        .post("/password/update", this.userInfo)
        .then((res) => {
          console.log(res);
          this.toast(this.$tr.t("Üstünlikli üýtgedildi"));
          this.$auth.fetchUser();
          this.$router.push("/profile");
        })
        .catch((err) => {
          if (err.response.data.username)
            this.toast(this.$tr.t("Email öň bar"));
          else this.toast(this.$tr.t("Ýalňyşlyk bar täzeden barlaň"));
        });
    },
  },
};
</script>

<style></style>
