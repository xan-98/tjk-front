export const state = () => ({
  currentLang: "tm",
  favorites: [],
  category: [],
  activeMenu: false,
  cart: [],
  shipping: "asgabat",
  search: "",
  info: {},
  isFirst: true,
});

export const mutations = {
  change_Lang(state, lang) {
    state.currentLang = lang;
    window.localStorage.setItem("lang", lang);
  },
  change_first(state) {
    state.isFirst = false;
  },

  setFavorites(state, favs) {
    state.favorites = favs;
  },

  setCart(state, cart) {
    state.cart = cart;
  },

  addCart(state, pr) {
    var prIndex = state.cart.findIndex(
      (p) => p.id == pr.id && p.activeSize == pr.activeSize
    );
    if (prIndex > -1) {
      state.cart[prIndex].amount += pr.amount;
    } else {
      state.cart.push(pr);
    }

    setCartLocalStorage(state.cart);
  },

  minusCart(state, pr) {
    var prIndex = state.cart.findIndex(
      (p) => p.id == pr.id && p.activeSize == pr.activeSize
    );

    if (prIndex > -1) {
      state.cart[prIndex].amount--;
      if (state.cart[prIndex].amount < 1) state.cart.splice(prIndex, 1);
    } else {
      console.log("product not found ! cart");
    }

    setCartLocalStorage(state.cart);
  },

  plusCart(state, pr) {
    var prIndex = state.cart.findIndex(
      (p) => p.id == pr.id && p.activeSize == pr.activeSize
    );
    if (prIndex > -1) {
      state.cart[prIndex].amount++;
    } else {
      console.log("product not found ! cart");
    }

    setCartLocalStorage(state.cart);
  },

  deleteCart(state, pr) {
    var prIndex = state.cart.findIndex(
      (p) => p.id == pr.id && p.activeSize == pr.activeSize
    );
    if (prIndex > -1) {
      state.cart.splice(prIndex, 1);
    } else {
      console.log("product not found ! cart");
    }

    setCartLocalStorage(state.cart);
  },

  clearCart(state) {
    state.cart = [];

    setCartLocalStorage(state.cart);
  },

  setCategory(state, cats) {
    state.category = cats;
  },

  setInfo(state, info) {
    state.info = info;
  },

  setActiveMenu(state, menu) {
    state.activeMenu = menu;
  },

  shippingChange(state, s) {
    state.shipping = s;
  },

  setSearch(state, s) {
    state.search = s;
  },

  // local storage

  catFromStorage(state, cart) {
    state.cart = cart;
  },
};

// export const actions = {
//     testf(p){
//         console.log(p);
//         return p + 'test'
//     }
// }
export const getters = {
  getCatById: (state) => (id) => {
    return state.category.find((cat) => cat.id == id);
  },
  getFirst: (state) => () => {
    return state.isFirst;
  },
};

function setCartLocalStorage(cart) {
  window.localStorage.setItem("cart", JSON.stringify(cart));
}
