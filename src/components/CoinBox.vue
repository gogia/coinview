<template>

  <v-container grid-list style="margin-top: 4rem">
    <v-layout wrap fluid>
    <v-flex v-for="(myCoin, index) in coinList" :key="index">
            <CoinCard
        :coinName="myCoin.name"
        :coinSymbol="myCoin.symbol"
        :currentPrice="myCoin.price"
        :hourChange="myCoin.hourChange"
        :marketDat="myCoin.marketDat"
      ></CoinCard>
        </v-flex>
            </v-layout>
  </v-container>



  <!--
    <v-btn @click=testFunc>Test</v-btn>
  -->
</template>

<script lang="ts">
import Vue from "vue";
import { coin } from "./coinObject";
import CoinCard from "./CoinCard.vue";
export default Vue.extend({
  components: {
    CoinCard
  },

  computed: {
    coinList: {
      get(): [] {
        return this.$store.state.testCoins;
      }
    }
  },

  methods: {
    testFunc() {
      console.log(this.coinList);
    }
  }
});
</script>
