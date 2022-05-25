<template>
  <div class="login">
    <div class="container">
      <div class="row justify-content-center pb-5 pt-5">
        <div class="col-md-12 col-lg-10">
          <div class="wrap d-md-flex justify-content-center">
            <!-- <div class="img"></div> -->
            <div class="login-wrap p-4 p-md-7">
              <div class="d-flex">
                <div class="w-100">
                  <h3 class="mb-4">Açar sözüni täzelemek</h3>
                </div>
              </div>
              <form @submit="onSubmitForm" :v-model="valid" class="signin-form">
                <div class="form-group mb-3">
                  <label class="label" for="email">Email</label>
                  <input
                    v-model="userInfo.email"
                    type="email"
                    class="form-control"
                    placeholder="email"
                  />
                </div>
                
                <div class="form-group">
                  <button
                    type="submit"
                    class="form-control btn btn-primary rounded submit px-3"
                  >
                    Täze açar sözüni iber
                  </button>
                </div>
                <div class="form-group d-md-flex">
                 
                </div>
              </form>
              <p class="text-center">
                 <NuxtLink to="/login">Yza</NuxtLink>
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
      },
    };
  },

  methods: {
    async onSubmitForm(event) {
      event.preventDefault();

      this.$axios
        .post("/password/reset", this.userInfo)
        .then((res) => {
          if (res.data.status=='success') {
            
            this.$router.push('/login')
            this.toast('Emailiňizi barlaň','Üstünlikli iberildi', 'success')

          }
        })
        .catch((err) => {
          if (err.response.data.username) this.toast("Email öň bar");
          else this.toast("Email tapylmady", 'Ýalňyşlyk bar');
        });


    },

    toast(message,title,type='danger', append = false) {
      this.counter++;
      this.$bvToast.toast(`${message}`, {
        title: title,
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: append,
        variant: type,
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