import Vue from "vue";
import Vuex from "vuex";
import { coin } from "./components/coinObject";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coinMenu: false,
    listMenu: false,
    optionMenu: false,
    coinOptionMenu: false,

    coinOptionSelected: "",

    coinsHeld: 0,

    daySelect: '1',

    testCoins: [] as coin[],

  },
  mutations: {
    menuSet: (state, payload: boolean) => (state.coinMenu = payload),
    listMenuSet: (state, payload: boolean) => (state.listMenu = payload),
    optionMenuSet: (state, payload: boolean) => (state.optionMenu = payload),
    coinOptionMenuSet: (state, payload: boolean) => (state.coinOptionMenu = payload), 

    coinOptionSelectedSet: (state, payload: string) => (state.coinOptionSelected = payload),
    coinOptionSelectedClear: (state) => (state.coinOptionSelected = ""),


    daySet: (state, payload: string) => (state.daySelect = payload),

    popCoin: (state, pc: string) => {
      const index = state.testCoins.findIndex(x => x.name === pc);
      if (index > -1) {
        state.testCoins.splice(index, 1);
      }
    },

    pushCoin: (state, newCoin: coin) => {
      state.testCoins.push(newCoin);
    },

    updateStats: (state, statCoin: coin) => {
      const index = state.testCoins.findIndex((x) => x.id === statCoin.id);
      state.testCoins[index].price = statCoin.price;
      state.testCoins[index].hourChange = statCoin.hourChange;
      state.testCoins[index].dailyChange = statCoin.dailyChange;
      state.testCoins[index].marketDat = statCoin.marketDat;
    },


    setCoinsHeld: (state, payload: number) => {
      state.coinsHeld = payload;
    },

    clearCoinsHeld: (state, payload: number) => {
      state.coinsHeld = 0;
    },

    updateCoinsHeld: (state, statCoin: string) => {
      const index = state.testCoins.findIndex((x) => x.name === statCoin);
      state.testCoins[index].coinsHeld = state.coinsHeld;
    },



  },
  actions: {}
});
