<template>
  <div class="cart-page">
    <div class="container">
      <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4><b>Shopping Cart</b></h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  {{ $store.state.cart.length }} items
                </div>
              </div>
            </div>
            <div class="row border-bottom">
              <div class="row main align-items-center">
                <div class="col-2"></div>
                <div class="col">
                  <div class="row"><b>Title</b></div>
                </div>
                <div class="col-2"></div>
                <div class="col-2">Price</div>

                <div class="col-2">Sum</div>
              </div>
            </div>
            <div
              v-for="(product, index) in $store.state.cart"
              :key="index"
              class="row border-top border-bottom"
            >
              <div class="row main align-items-center">
                <div class="col-2">
                  <NuxtLink :to="'/products/detail/' + product.id">
                    <img class="img-fluid" :src="product.images[0].image" />
                  </NuxtLink>
                </div>
                <div class="col">
                  <div class="row text-black">
                    {{
                      product["title_" + $store.state.currentLang]
                        ? product["title_" + $store.state.currentLang]
                        : product.title
                    }}
                  </div>
                  <div class="row">{{ product.activeSize }}</div>
                </div>
                <div class="col-2 counter">
                  <span @click="$store.commit('minusCart', product)">-</span>
                  <span class="border">{{ product.amount }}</span>
                  <span @click="$store.commit('plusCart', product)">+</span>
                </div>
                <div class="col-2 text-black">TMT {{ product.price }}</div>

                <div class="col-2 text-black">
                  TMT {{ (product.price * product.amount).toFixed(1) }}
                  <span
                    @click="$store.commit('deleteCart', product)"
                    class="close"
                    >&#10005;</span
                  >
                </div>
              </div>
            </div>
            <div class="back-to-shop">
              <NuxtLink to="/new-products">
                &leftarrow;
                <span class="text-muted">Back to shop</span>
                </NuxtLink>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5><b>Summary</b></h5>
            </div>
            <hr />
            <div class="row">
              <div class="col" style="padding-left: 0">
                Items {{ $store.state.cart.length }}
              </div>
              <div class="col text-right">TMT {{ getSum() }}</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select v-model="shipping" @change="shippingChange()">
                <option class="text-muted" value="asgabat">
                  Aşgabat - 15 TMT
                </option>
                <option class="text-muted" value="welayat">
                  Beýleki welaýatlar - 50 TMT
                </option>
              </select>
            </form>
            <div
              class="row"
              style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
            >
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right">{{ getTotal() }} TMT</div>
            </div>
            <NuxtLink to="/checkout" class="btn" v-if="$store.state.cart.length">CHECKOUT</NuxtLink>
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
      shipping: this.$store.state.shipping,
      sum: 0
    };
  },
  methods: {
    getSum() {
      var sum = 0;
      var list = this.$store.state.cart;
      for (let i = 0; i < list.length; i++) {
        sum += list[i].amount * list[i].price;
      }
      this.sum = sum
      return sum.toFixed(1);
    },

    getTotal() {
      var sp = this.shipping == 'asgabat' ? 15 : 50
      return this.sum + sp;
    },

    shippingChange() {
      this.$store.commit("shippingChange", this.shipping);
    },
  },
};
</script>

<style lang="scss">
.cart-page {
  .text-black {
    color: #000000;
  }

  .counter {
    color: #000000;
    font-size: 22px;
    user-select: none;

    span {
      padding: 2px 5px;
      cursor: pointer;
    }
  }

  .close {
    cursor: pointer;
  }
}
</style>