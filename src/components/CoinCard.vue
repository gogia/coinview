<template>
  <v-card
    outlined
    style="margin-top: 2rem;"
    height="20rem"
    width="17rem"
  >
  <v-layout justify-center>
    <v-card-title>{{ this.coinName }} | {{ this.coinSymbol }}</v-card-title>
  </v-layout>
    <v-layout justify-center>
    <span>{{ this.currentPrice }}  |  {{ this.hourChange }} </span>
    <v-btn @click="test">TEST</v-btn>
    </v-layout>
    <v-layout>
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
    auto-draw
  ></v-sparkline>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

  /*
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  */


//If Number(this.hourChange) = 0 css color blue
//If Number(this.hourChange) > 0 css color green
//If Number(this.hourChange) < 0 css color red
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
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: ['#f72047', '#ffd200', '#1feaea'],
      //value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      //gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),


  methods: {
    test(){
      console.log("CREATED");
      console.log(this.marketDat);
    }
  }

});
</script>
