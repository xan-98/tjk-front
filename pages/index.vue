<template>
  <div>
    <div class="index">
        <Slider/>
        <Privilege/>

        <NewProducts/>
   
        <BestSeller/>
        <NewsLast/>
    </div>
  </div>
</template>

<script>
import BestSeller from "../components/home/BestSeller.vue";
export default {
    name: "IndexPage",
    components: { BestSeller }
}
</script>
