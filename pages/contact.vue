<template>
  <div class="contact">
    <div class="c-header">
      <div class="container">
        <div class="breadcrumbs">
          <ul>
            <li>
              <n-link to="/main"> {{ $tr.t("Baş sahypa") }} </n-link>
            </li>
            <li>{{ $tr.t("Habarlaşmak") }}</li>
          </ul>
        </div>

        <h3>{{ $tr.t("Habarlaşmak") }}</h3>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <div class="c-row">
          <div class="image">
            <img src="~/assets/img/reklam21.png" alt="" />
          </div>

          <div class="right-col">
            <h3>{{ $tr.t("Tikinçilik fabrigi") }}</h3>

            <div class="description">
              Toplumda innowasion tehnologiýalary hem ulanylýar. Muňa mysal edip
              lazer sehini getirmek bolar. Bu ýerde lazeriň kömegi bilen 90
              sekundyň dowamynda jins önümlerine dürli nagyşlar, gradientler,
              nyşanlar we beýleki şekiller goýulýar.
            </div>

            <form @submit="onSubmitForm" class="form">
              <div class="c-row">
                <div class="c-col">
                  <label for="name">{{ $tr.t("Adyňyz") }}</label>
                  <input
                    v-model="contactInfo.name"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                </div>
                <div class="c-col">
                  <label for="email">{{ $tr.t("Email") }}</label>
                  <input
                    v-model="contactInfo.email"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
              </div>

              <label for="message">{{ $tr.t("Hatynyz") }}</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                v-model="contactInfo.message"
                required
              ></textarea>

              <button type="submit" class="send">{{ $tr.t("ugrat") }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="map-show">
      <div class="container">
        <img src="" alt="locations" />
        <div class="text">
          <h3>Dükanlaryň salgylary</h3>
          <a href="#">Kartada görmek</a>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
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

      this.$axios
        .post("/createcontact", this.contactInfo)
        .then((res) => {
          this.toast(this.$tr.t("Iberildi"));
          this.$router.push("/");
        })
        .catch((err) => {
          this.toast(this.$tr.t("Ýalňyşlyk bar täzeden barlaň"));
        });
    },
  },
};
</script>

<style></style>
