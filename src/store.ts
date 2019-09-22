import Vue from "vue";
import Vuex from "vuex";
import { coin } from './components/coinObject';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coinMenu: false,
    listMenu: false,

    testCoins: [] as coin[],
  },
  mutations: {
    menuSet: (state, payload: boolean) => (state.coinMenu = payload),
    listMenuSet: (state, payload: boolean) => (state.listMenu = payload),

    popCoin: (state, pc: coin) => {
      const index = state.testCoins.findIndex((x) => x === pc);
      if (index > -1) {
          state.testCoins.splice(index, 1);
      }
  },

  pushCoin: (state, newCoin: coin) => {
    state.testCoins.push(newCoin);
},


  },
  actions: {}
});
