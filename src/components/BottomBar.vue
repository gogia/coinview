<template>
  <v-toolbar
    bottom
    absolute
    style="margin-bottom: 2rem; width: 100%"
    color="#FAB3A9"
  >
    <v-layout justify-center>
      <v-btn style="margin-right: 2rem" @click="coinDialog">Add Coin</v-btn>
      <v-btn style="margin-right: 2rem" @click="listDialog">List Coins</v-btn>
      <v-btn style="margin-right: 2rem" @click="test">Options</v-btn>
    </v-layout>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    coinDialog() {
      this.$store.commit("menuSet", true);
    },

    listDialog() {
      this.$store.commit("listMenuSet", true);
    },
    
    test() {
      console.log(this.$store.state.testCoins);
    }
  }
});
</script>
