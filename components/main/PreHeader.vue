<template>
    <div class="pre-header">
        <b-container>
            <div class="wrapper">
                <div class="info">
                    <span class="item">
                        <a :href="'tel:'+$store.state.info.phone">
                            <BIconTelephone></BIconTelephone>{{ $store.state.info.phone }}
                        </a>
                    </span>

                    <span class="item">
                        <a :href="'mailto:'+$store.state.info.email">
                            <BIconEnvelope></BIconEnvelope>{{ $store.state.info.email }}
                        </a>
                    </span>
                </div>

                <div class="lang-picker">
                    <div class="dropdown">
                        <button class="dropbtn">
                            <img :src="'/_nuxt/assets/img/flags/'+$store.state.currentLang+ '.png'" alt="TM" />
                            <span>{{ $store.state.currentLang }}</span>
                            <BIconCaretDownFill></BIconCaretDownFill>
                        </button>
                        <div class="dropdown-content">
                            <a href="#"  @click="changeLang('tm')">
                                <img src="~/assets/img/flags/tm.png" alt="tm" />
                                <span>TM</span>
                            </a>

                            <a href="#"  @click="changeLang('en')">
                                <img src="~/assets/img/flags/en.png" alt="en" />
                                <span>EN</span>
                            </a>
                            
                            <a href="#"  @click="changeLang('ru')">
                                <img src="~/assets/img/flags/ru.png" alt="ru" />
                                <span>RU</span>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import { BIconTelephone, BIconEnvelope, BIconCaretDownFill } from 'bootstrap-vue'
export default {
    components: {
        BIconTelephone,
        BIconEnvelope,
        BIconCaretDownFill
    },
    data(){
        return{
            langs:{
                tm: 'Türkmen',
                en: 'English',
                ru: 'Russian'
            },
        }
    },
    methods: {
        changeLang(l){
            this.$store.commit('change_Lang', l)
            this.$tr.setCurrentLang(l)
        }
    },

    mounted(){
    
        var local_lang = window.localStorage.getItem('lang')
        if ( ['tm', 'en', 'ru'].includes(local_lang)){
            
            this.$store.commit('change_Lang', local_lang);
            this.$tr.setCurrentLang(local_lang);
            
        }
    }

  

}
</script>

<style>
</style>