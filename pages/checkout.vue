<template>
  <div class="chechout-page cart-page">
    <div class="container">
      <div class="card">
        <form @submit="sendOrder">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4><b>Sargydy tassyklamak</b></h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  {{ $store.state.cart.length }} harytlar
                </div>
              </div>
            </div>

            <div class="c-form">
              <div class="c-row">
                <label for="name">Adyňyz <span>*</span></label>
                <input v-model="userInfo.name" type="text" required />

                <label for="phone">Telefon <span>*</span></label>
                <input v-model="userInfo.phone" type="text" required />

                <label for="email">Email</label>
                <input v-model="userInfo.email" type="email" />

                <label for="address">Salgy <span>*</span></label>
                <textarea
                  v-model="userInfo.address"
                  required
                  rows="6"
                ></textarea>
              </div>
            </div>

            <div class="back-to-shop">
              <NuxtLink to="/cart">
                &leftarrow;
                <span class="text-muted">Yza gaýtmak</span>
              </NuxtLink>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5><b>Jemi</b></h5>
            </div>
            <hr />
            <div class="row">
              <div class="col" style="padding-left: 0">
                Harytlar {{ $store.state.cart.length }}
              </div>
              <div class="col text-right">{{ getSum() }} TMT</div>
            </div>

            <div class="row">
              <div class="col" style="padding-left: 0">Eltip berme</div>
              <div class="col text-right">
                {{ $store.state.shipping == "welayat" ? 50 : 15 }} TMT
              </div>
            </div>
            <br />
            <p>Töleg görnüşi</p>
            <select v-model="payment">
              <option class="text-muted" value="nagt">
                Eltip berensoň nagt
              </option>
              <option class="text-muted" value="baranda-cart">
                Eltip berensoň kartdan tölemek
              </option>

              <option class="text-muted" value="cart">Online tölemek</option>
            </select>

            <div
              class="row"
              style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
            >
              <div class="col">Jemi Töleg</div>
              <div class="col text-right">
                {{ getTotal() }} TMT
              </div>
            </div>
            <button
              v-if="$store.state.cart.length"
              type="submit"
              class="btn"
            >
              Sargyt etmek
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payment: "nagt",
      sum: 0,
      userInfo: {
        name: "",
        phone: "",
        email: "",
        address: "",
      },
    };
  },



  mounted() {
    if(!this.$store.state.cart.length)
        this.$router.push("/");
        
    if (this.$auth.loggedIn) {
      this.userInfo.name = this.$auth.user.first_name;
      this.userInfo.phone = this.$auth.user.account.phone;
      this.userInfo.email = this.$auth.user.email;
      this.userInfo.address = this.$auth.user.account.address;
    }

    this.getSum();
  },

  methods: {
    sendOrder(event) {
      event.preventDefault();
      var data = {
        items: this.$store.state.cart,
        shipping_method: this.$store.state.shipping,
        payment_method: this.payment,

        ...this.userInfo,
      };

      this.$axios
        .post("/createorder", data)
        .then((res) => {
          if (res.data.status == "success") {
            this.$store.commit("clearCart");
            this.$router.push("/check");
          }else
          if (res.data.status == 'online'){
            console.log(res.data);
            window.open(res.data.url, '_self')
          }else{
              this.toast('Ýalňyşlyk bar täzeden barlaň')
          }

      
        })
        .catch((err) => {
          this.toast('Ýalňyşlyk bar täzeden barlaň')
          if (err.response.data.username) console.log("Email öň bar");
          else console.log(err);
        });
    },

    getSum() {
      var sum = 0;
      var list = this.$store.state.cart;
      for (let i = 0; i < list.length; i++) {
        sum += list[i].amount * list[i].price;
      }
      this.sum = sum;
      return sum.toFixed(1);
    },

    getTotal() {
      var sp = this.$store.state.shipping == "welayat" ? 50 : 15;
      return this.sum + sp;
    },

    shippingChange() {
      this.$store.commit("shippingChange", this.shipping);
    },

    toast(message, append = false) {
      this.$bvToast.toast(`${message}`, {
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: append,
        variant: "success",
      });
    },
  },
};
</script>

<style lang="scss">
.c-form {
  input,
  textarea {
    border-color: #000000;
  }

  textarea {
    width: 100%;
  }

  label {
    span {
      color: #ee7b7b;
    }
  }
}
.cart-page {
  .btn {
    font-size: 15px;
  }
}
</style>