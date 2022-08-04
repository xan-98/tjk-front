<template>
  <div class="check">
    <div class="container text-center">
       <h2 v-if="new Date().getHours() > 19 || new Date().getHours() < 8">
          {{ $tr.t('Sargyt Kabul edildi! Ertir sagat 13:00 çenli eliňizde bolar', $store.state.currentLang)}}
        </h2>

        <h2 v-else>
          {{ $tr.t('Sargyt Kabul edildi!')}}
        </h2>
      <NuxtLink to="/"> {{ $tr.t('Baş sahypa')}} </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {};
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