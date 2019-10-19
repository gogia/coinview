<template>
  <v-card
    outlined
    style="margin-top: 2rem;"
    height="15rem"
    width="30rem"
  >
  <v-layout justify-center>
    <v-card-title>{{ this.coinName }} | {{ this.coinSymbol }}</v-card-title>
  </v-layout>
    <v-layout justify-center>
    <span>{{ this.currentPrice }}  |  {{ this.hourChange }} </span>
    </v-layout>
    <v-layout>
      <!-- 
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

        -->
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
      fill: true,
      type: 'trend',
      autoLineWidth: false,
      testArr: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    }),


  methods: {
    test(){
      console.log("CREATED");
      console.log(this.testArr);
    },

    created(){
            //this.testArr = this.marketDat;
    }

  }

});
</script>
