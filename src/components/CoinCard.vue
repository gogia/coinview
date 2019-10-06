<template>
  <v-card
    outlined
    style="margin-right: 4rem; margin-top: 2rem;"
    height="20rem"
    width="17rem"
  >
    <v-card-title>{{ this.coinName }} | {{ this.coinSymbol }}</v-card-title>
    <span>{{ this.currentPrice }} | {{ this.hourChange }} </span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    coinName: String,
    coinSymbol: String,
    currentPrice: Number,
    hourChange: Number,
    dailyChange: Number
  }

  /*
   data: () => ({ 
    coinName: String,
    coinSymbol: String,
    currentPrice: Number,
    hourChange: Number,
    dailyChange: Number
   }),
  */
});
</script>
