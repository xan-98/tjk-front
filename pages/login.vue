<template>
  <div class="login">
    <div class="container">
      <div class="row justify-content-center pb-5 pt-5">
        <div class="col-md-12 col-lg-10">
          <div class="wrap d-md-flex">
            <div class="img"></div>
            <div class="login-wrap p-4 p-md-5">
              <div class="d-flex">
                <div class="w-100">
                  <h3 class="mb-4">Giriş</h3>
                </div>
              </div>
              <form @submit="onSubmitForm" :v-model="valid" class="signin-form">
                <div class="form-group mb-3">
                  <label class="label" for="email">Email</label>
                  <input
                    v-model="userInfo.username"
                    type="email"
                    class="form-control"
                    placeholder="email"
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="label" for="password">Açar sözi</label>
                  <input
                    v-model="userInfo.password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="form-control btn btn-primary rounded submit px-3"
                  >
                    Giriş
                  </button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50 text-left">
                    <div class="custom-control custom-checkbox">
                      <input
                        v-model="userInfo.remember"
                        id="remember"
                        type="checkbox"
                        name="remember"
                        class="custom-control-input"
                        value="accepted"
                      />
                      <label for="remember" class="custom-control-label">
                        Ýatda sakla
                      </label>
                    </div>
                  </div>
                  <div class="w-50 text-md-right">
                    <a href="#">Açar sözi unutdym</a>
                  </div>
                </div>
              </form>
              <p class="text-center">
                Agza dälmi?
                <NuxtLink to="/register" class="singup" >
                  Ýazylmak</NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      userInfo: {
        email: "",
        username: "",
        password: "",
        remember: false,
      },
    };
  },

  methods: {
    async onSubmitForm(event) {
      event.preventDefault();

      try {
        let response = await this.$auth.loginWith("local", {
          data: this.userInfo,
        });
        // console.log(response.data.access)
        this.$auth.strategy.token.set(response.data.access);

        await this.$auth.fetchUser();
        // // let test = await this.$auth.fetchUser()
        // // this.$axios.get('/user' );

        if (this.userInfo.remember) {
          this.$cookies.set("auth_expire", 60 * 60 * 24 * 60, {
            path: "/",
            maxAge: 60 * 60 * 24 * 60,
          });
        } else {
          this.$cookies.set("auth_expire", -1, {
            path: "/",
            maxAge: -1,
          });
        }

        const favs = await this.$axios.get("/getfavorite");
        this.$store.commit("setFavorites", favs.data.results);

        // this.$auth.user
      } catch (err) {
        this.toast('Email ýa-da parol ýalňyş')
        console.log(err);
      }
    },

    toast(message, append = false) {
      this.counter++;
      this.$bvToast.toast(`${message}`, {
        title: `Ýalnyşlyk`,
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: append,
        variant: "danger",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login .img {
  background-image: url(~/assets/img/login-bg.jpg);
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  top: 0.4rem;
  background-color: #000000;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #000000;
}

.custom-control-label::before {
  top: 0.4rem;
}

.singup:hover {
  color: #ec0153;
}
</style>