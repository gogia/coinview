import Vue from "vue";
import Vuex from "vuex";
import { coin } from "./components/coinObject";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coinMenu: false,
    listMenu: false,

    testCoins: [] as coin[],
    tempArray: [] as number[],

  },
  mutations: {
    menuSet: (state, payload: boolean) => (state.coinMenu = payload),
    listMenuSet: (state, payload: boolean) => (state.listMenu = payload),

    popCoin: (state, pc: coin) => {
      const index = state.testCoins.findIndex(x => x === pc);
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

    arrayGen: (state, coin: coin) => {
      state.tempArray = coin.marketDat;
    },

    arrayClear: (state) => {
      state.tempArray.length = 0;
    },

    




  },
  actions: {}
});
