<template>
  <div class="contact">
    <div class="c-header">
      <div class="container">
        <div class="breadcrumbs">
          <ul>
            <li>
              <n-link to="/"> Baş sahypa </n-link>
            </li>
            <li>Habarlaşmak</li>
          </ul>
        </div>

        <h3>Habarlaşmak</h3>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <div class="c-row">
          <div class="image">
            <img src="~/assets/img/reklam21.png" alt="" />
          </div>

          <div class="right-col">
            <h3>Tikinçilik fabrigi</h3>

            <div class="description">
              Toplumda innowasion tehnologiýalary hem ulanylýar. Muňa mysal edip
              lazer sehini getirmek bolar. Bu ýerde lazeriň kömegi bilen 90
              sekundyň dowamynda jins önümlerine dürli nagyşlar, gradientler,
              nyşanlar we beýleki şekiller goýulýar.
            </div>

            <form @submit="onSubmitForm" class="form">
              <div class="c-row">
                <div class="c-col">
                  <label for="name">Adyňyz</label>
                  <input
                    v-model="contactInfo.name"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                </div>
                <div class="c-col">
                  <label for="email">E-mail</label>
                  <input
                    v-model="contactInfo.email"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
              </div>

              <label for="message">Hatynyz</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                v-model="contactInfo.message"
                required
              ></textarea>

              <button type="submit" class="send">ugrat</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="map-show">
      <div class="container">
        <img src="~/assets/img/locs.png" alt="locations" />
        <div class="text">
          <h3>Dükanlaryň salgylary</h3>
          <a href="#">Kartada görmek</a>
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
          this.toast("Iberildi");
          this.$router.push("/");
        })
        .catch((err) => {
          if (err.response.data.username) this.toast("Email öň bar");
          else this.toast("Ýalňyşlyk bar täzeden barlaň");
        });
    },
  },
};
</script>

<style>
</style>