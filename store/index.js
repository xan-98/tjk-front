

export const state = () => ({
    currentLang: 'tm',
    favorites: [],
    category: [],
    activeMenu: false,
    cart:[],
    shipping: 'asgabat',
    search:'',
    info:{}

})

export const mutations = {
    change_Lang(state, lang) {
        state.currentLang = lang;
        window.localStorage.setItem('lang', lang)
    },

    setFavorites(state, favs) {
        state.favorites = favs
    },

    setCart(state, cart) {
        state.cart = cart
    },

    addCart(state, pr) {
        var prIndex = state.cart.findIndex(p => p.id == pr.id && p.activeSize == pr.activeSize)
        if(prIndex > -1){
            state.cart[prIndex].amount += pr.amount
        }else{
            state.cart.push(pr)
        }
    },

    minusCart(state, pr) {
        
        var prIndex = state.cart.findIndex(p => p.id == pr.id && p.activeSize == pr.activeSize)
       
        if(prIndex > -1){
            
            state.cart[prIndex].amount --
            if(state.cart[prIndex].amount < 1)
               state.cart.splice(prIndex,1)
        }else{
            console.log('product not found ! cart');
        }
    },

    plusCart(state, pr) {
        var prIndex = state.cart.findIndex(p => p.id == pr.id && p.activeSize == pr.activeSize)
        if(prIndex > -1){
            state.cart[prIndex].amount ++
        }else{
            console.log('product not found ! cart');
        }
    },

    deleteCart(state, pr) {
        var prIndex = state.cart.findIndex(p => p.id == pr.id && p.activeSize == pr.activeSize)
        if(prIndex > -1){
            state.cart.splice(prIndex,1)
        }else{
            console.log('product not found ! cart');
        }
    },

    clearCart(state){
        state.cart= []
    },

    setCategory(state, cats) {
        state.category = cats
    },

    setInfo(state, info) {
        state.info = info
    },

    setActiveMenu(state, menu) {
        state.activeMenu = menu
    },

    shippingChange(state, s) {
        state.shipping = s
    },

    setSearch(state, s) {
        state.search = s
    },
}





// export const actions = {
//     testf(p){
//         console.log(p);
//         return p + 'test'
//     }
// }
export const getters = {
    getCatById: (state) => (id) => {
        return state.category.find(cat => cat.id == id)
    }
}