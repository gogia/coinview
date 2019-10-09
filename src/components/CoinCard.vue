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
    </v-layout>
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

});
</script>
