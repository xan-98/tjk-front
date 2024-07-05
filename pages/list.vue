<template>
  <div class="pr-list">
    <div class="container">
      <div class="breadcrumbs">
        <ul>
          <li>
            <NuxtLink to="/main"> Baş sahypa </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"> test </NuxtLink>
          </li>
          <li>Zenanlar</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-4 col-sm-6 py-4">
          <ProductSingle />
        </div>
        <div class="col-md-4 col-sm-6 py-4">
          <ProductSingle />
        </div>
        <div class="col-md-4 col-sm-6 py-4">
          <ProductSingle />
        </div>
        <div class="col-md-4 col-sm-6 py-4">
          <ProductSingle />
        </div>
        <div class="col-md-4 col-sm-6 py-4">
          <ProductSingle />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("change_first");
  },
};
</script>

<style></style>
