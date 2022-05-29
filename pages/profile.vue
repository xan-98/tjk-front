<template>
  <div class="profile">
    <div class="container">
      <b-card no-body>
        <b-tabs pills card>
          <b-tab :title="$tr.t('Meniň profilim', $store.state.currentLang)" active>
            <div class="container">
              <div class="row">
                <!-- <div class="col-md-4">
                  <div class="p-image">
                    <img src="~/assets/img/profile-d.png" alt="" />
                  </div>
                </div> -->

                <div class="offset-md-3 col-md-7">
                  <form @submit="onSubmitForm" class="form">
                    <div class="c-col">
                      <label for="name">{{ $tr.t('Ady')}}</label>
                      <input
                        v-model="userInfo.first_name"
                        type="text"
                        name="name"
                      />
                    </div>

                    <div class="c-col">
                      <label for="email">{{ $tr.t('Email')}}</label>
                      <input
                        v-model="userInfo.email"
                        type="email"
                        name="email"
                      />
                    </div>

                    <div class="c-col">
                      <label for="phone">{{ $tr.t('Telefon')}}</label>
                      <input
                        v-model="userInfo.phone"
                        type="text"
                        name="phone"
                      />
                    </div>

                    <div class="c-col">
                      <label for="address">{{ $tr.t('Salgy')}}</label>
                      <textarea
                        v-model="userInfo.address"
                        name="address"
                        cols="30"
                        rows="5"
                      ></textarea>
                    </div>

                    <NuxtLink class="password-change" to="/password"
                      >{{ $tr.t('Açar sözüni täzelemek')}}</NuxtLink
                    >

                    <button class="change" type="submit">{{ $tr.t('Üýtget')}}</button>
                  </form>

                  <div @click="$auth.logout()" class="logout">{{ $tr.t('Çykmak')}}</div>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab :title="$tr.t('Sargytlarym')" >
              <div class="cart-page" style="padding:0">

                  <div class="container ">
                    <div class="cart">
                      <div class="row border-bottom">
                        <div class="row main align-items-center">
                          <div class="col">
                            <div class="row"><b>{{ $tr.t('Id')}}</b></div>
                          </div>
                          <div class="col"><b>{{ $tr.t('Ýagdaýy')}}</b></div>
      
                          <div class="col"><b>{{ $tr.t('Eltip berme')}}</b></div>
                          <div class="col"><b>{{ $tr.t('Jemi')}}</b></div>
                          <div class="col"><b>{{ $tr.t('Wagty')}}</b></div>
                        </div>
                      </div>
                      
                      <div class="row border-bottom" v-for="(item, index) in order" :key="index">
                        <div class="row main align-items-center">
                          <div class="col">
                            <div class="row"><b>{{ item.id }}</b></div>
                          </div>
                          <div class="col">{{ item.status }}</div>
      
                          <div class="col" style="text-transform: capitalize;">{{ item.shipping_method }}</div>
                          <div class="col">{{ item.total }}</div>
                          <div class="col">{{ dateFormat(item.created)}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            

          </b-tab>
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
        ...this.$auth.user,
        ...this.$auth.user.account,
      },

      order: [],
    };
  },

  async fetch() {
    const res = await this.$axios.get("/orders/?user=" + this.$auth.user.id);
    this.order = res.data.results;
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

      this.userInfo.username = this.userInfo.email;

      if (this.userInfo.password !== this.userInfo.confirm_password) {
        this.toast(this.$tr.t("Parollar gabat gelmedi!"));
        return false;
      }

      this.$axios
        .post("/update", this.userInfo)
        .then((res) => {
          console.log(res);
          this.toast(this.$tr.t("Üstünlikli üýtgedildi"));
          this.$auth.fetchUser();
        })
        .catch((err) => {
          if (err.response.data.username) this.toast(this.$tr.t("Email öň bar"));
          else this.toast(this.$tr.t("Ýalňyşlyk bar täzeden barlaň"));
        });
    },

    dateFormat(dt){
        var d = new Date(dt)
        return d.getDay() + '/' + d.getMonth()+1 + '/' + d.getFullYear()
    }
  },
};
</script>

<style>
</style>