<template>
    <div class="banner">
        <div class="container">
            <img :src="data.image" alt="">
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
        margin: 100px 0;
        img{
            width: 100%;
            border-radius: 6px;
        }
    }
</style>