<template>
    <div class="privilege">
        <div class="container">
            <div class="c-row">
                <div class="c-col" v-for="(item, index) in data" :key="index">
                    <img :src="item.image" alt="privilege">
                    <div class="text">
                        <div class="title">
                            {{ item['title_'+ $store.state.currentLang ] ? item['title_'+ $store.state.currentLang ] : item.title }}
                        </div>
                        <div class="sub">
                            {{ item['sub_title_'+ $store.state.currentLang ] ? item['sub_title_'+ $store.state.currentLang ] : item.sub_title }}
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            data: '',
        }
    },

    async fetch(){
        const res= await this.$axios.get('/ayratynlyk')
        this.data = res.data.results
    },
}
</script>

<style>
</style>