<template>
  <div class="check">
    <div class="container text-center">
      <Loading :height="300" v-if="status == 'loading'" />
      <h2 v-if="status == 'error'">
        {{ $tr.t("Ýalňyşlyk döredi täzeden barlaň", $store.state.currentLang) }}
      </h2>
      <div v-if="status == 'success'">
        <h2 v-if="new Date().getHours() > 19 || new Date().getHours() < 8">
          {{
            $tr.t("Sargyt Kabul edildi! Ertir sagat 13:00 çenli eliňizde bolar")
          }}
        </h2>

        <h2 v-else>
          {{ $tr.t("Sargyt Kabul edildi!") }}
        </h2>
        <NuxtLink to="/"> {{ $tr.t("Baş sahypa") }} </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "loading",
    };
  },
  async mounted() {
    this.$store.commit("change_first");

    var orderId = this.$route.query.orderId;
    var pthis = this;
    this.$axios
      .get("/createorder?orderId=" + orderId)
      .then((res) => {
        if (res.data.status == "success") {
          pthis.$store.commit("clearCart");
          console.log(res.data);
          this.status = "success";
        } else {
          pthis.show = false;
          console.log(res.data);
          this.status = "error";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
.check {
  margin: 120px 0 150px;

  h2 {
    margin-bottom: 40px;
  }

  a {
    border: 1px solid #000000;
    background: #000000;
    color: #ffffff;
    text-align: center;
    border-radius: 58px;
    padding: 10px 34px;
    right: 5px;
    top: 5px;

    &:hover {
      background: #ffffff;
      color: #000000;
    }
  }
}
</style>
