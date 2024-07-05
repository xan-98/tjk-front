import en from '~/assets/lang/en.json';
import ru from '~/assets/lang/ru.json';

var data = {
    en,
    ru
}


const tr = {
    lang: 'tm',
    t(word) {
        if(this.lang == 'tm')
            return word
        else{
            if(data[this.lang][word])
                return data[this.lang][word]
            return word
        }
    },

    setCurrentLang(l){
        this.lang = l
    }
  }

  export default ({ app }, inject) => {
    inject('tr', tr)
  }