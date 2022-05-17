<template>
  <div class="help-order about">
    <div class="c-header">
      <div class="container">
        <div class="breadcrumbs">
          <ul>
            <li>
              <n-link to="/"> Baş sahypa </n-link>
            </li>
            <li>Saýtymyzdan nädip sargamaly</li>
          </ul>
        </div>

        <h3>Saýtymyzdan nädip sargamaly</h3>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <div class="wrapper" 
            v-html='data["description_" + $store.state.currentLang] ? data["description_" + $store.state.currentLang]: data.description'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      "/other/about/1"
    );
    this.data = res.data;
  },
};
</script>

<style>
</style>