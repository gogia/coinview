<template>
  <v-card
    outlined
    style="margin-top: 2rem;"
    height="16rem"
    width="30rem"
    @click="coinOptionMenuOpen"
  >
    <v-layout justify-center>
      <v-card-title>
        <span class="disable-select">{{ this.coinName }}</span>
        <span style="margin-left:1rem; margin-right:1rem"></span>
        <span class="disable-select">{{ this.coinSymbol }}</span>
      </v-card-title>
    </v-layout>
    <v-layout justify-center>
      <span class="disable-select">{{ this.currentPrice}}</span>
      <span style="margin-left:.5rem; margin-right:.5rem"></span>
      <span class="disable-select" :style="colorizer(this.hourChange)">{{ this.hourChange }}</span>
    </v-layout>
    <v-layout justify-center>
      <span v-if="getCoinsHeld != 0" class="disable-select">{{getCoinsHeld}}</span>
      <span v-if="getCoinsHeld != 0" style="margin-left:.5rem; margin-right:.5rem"></span>
      <span
        v-if="getCoinsHeld != 0"
        class="disable-select"
      >{{(getCoinsHeld * Number(this.currentPrice.slice(1))).toFixed(2)}}</span>
    </v-layout>
    <v-layout>
      <v-card-text>
        <v-sparkline
          :value="this.marketDat"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
        ></v-sparkline>
      </v-card-text>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { coin } from "./coinObject";

export default Vue.extend({
  props: {
    coinName: String,
    coinSymbol: String,
    currentPrice: String,
    hourChange: String,
    dailyChange: String,
    marketDat: Array
  },

  data: () => ({
    width: 2,
    radius: 3,
    padding: 1,
    lineCap: "round",
    gradient: ["#00c6ff", "#F0F", "#FF0"],
    gradientDirection: "top",
    fill: true,
    type: "trend",
    autoLineWidth: false,
  }),

  computed: {
    getCoinsHeld() {
      let index = this.$store.state.testCoins.findIndex(
        (x: coin) => x.name === this.coinName
      );
      return this.$store.state.testCoins[index].coinsHeld;
    }
  },

  methods: {
    test() {
      console.log(Number(this.currentPrice.slice(0)));
    },

    coinOptionMenuOpen() {
      this.$store.commit("coinOptionMenuSet", true);
      this.$store.commit("coinOptionSelectedSet", this.coinName);
    },

    colorizer(item: string) {
      var num = Number(item.substring(0, item.length - 1));
      if (num == 0) {
        return "color: #FAA613";
      }
      if (num > 0) {
        return "color: #688E26";
      }
      if (num < 0) {
        return "color: #FAB3A9";
      }
    },

    created() {
    }
  }
});
</script>

<style scoped>
.disable-select {
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
</style>