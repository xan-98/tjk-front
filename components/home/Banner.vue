<template>
    <div class="banner">
        <div class="container-fluid">
            <img :src='data["image_" + $store.state.currentLang]
                      ? data["image_" + $store.state.currentLang]
                      : data.image'  alt="">
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            data: {},
        }
    },

    async fetch(){
        const res= await this.$axios.get('/reklams')
        this.data = res.data.results[0]
    },
}
</script>

<style lang="scss">
    .banner{
        padding: 100px 0;
        background: #ffffff;
        img{
            width: 100%;
            border-radius: 6px;
        }
    }
</style>