import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coinMenu: false,
  },
  mutations: {
    menuSet: (state, payload: boolean) => state.coinMenu = payload,

  },
  actions: {}
});
