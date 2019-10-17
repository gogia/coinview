<template>
  <v-dialog v-model="$store.state.listMenu" persistent max-width="600px">
    <v-card dark>
      <v-container>
        <v-layout flex wrap>
          <!-- <template v-for="item in $store.state.testCoins"> -->
            <v-flex xs6 v-for="(item, index) in  $store.state.testCoins" :key="index">
            <v-list-tile ripple @click="coinDelete(item)">
              <v-list-tile-content>
                <v-list-tile-title>{{
                  `${item.name} | ${item.symbol}`
                }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-md>
        <v-card-actions>
          <small>Click Coin to Delete</small>
          <v-spacer></v-spacer>
          <!--
            <v-btn color="#EDC3C5"  @click="addFlip">Add Coin</v-btn>
            <v-btn color="#EDC3C5"  @click="optionsDialogFlip">Options</v-btn>
            -->
          <v-btn color="#EDC3C5" @click="listClose">Close</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    coinDelete(item: string) {
      this.$store.commit("popCoin", item);
      //this.interval();
    },

    listClose() {
      this.$store.commit("listMenuSet", false);
    }

    /*
      interval() {
      let intr;
      switch (this.$store.state.testCoins.length) {
        case 0: {
          clearInterval(intr);
          break;
        }
        case 1: {
          intr = setInterval(() => this.updateWrapper(), this.optimizeTime());
          break;
        }
        default: {
          clearInterval(intr);
          intr = setInterval(() => this.updateWrapper(), this.optimizeTime());
          break;
        }
      },
      */
  }
});
</script>
