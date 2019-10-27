<template>
  <v-dialog v-model="$store.state.coinOptionMenu" persistent max-width="600px">
    <v-card dark>
        <v-layout justify-center>
        <v-card-title>
          <span>{{this.$store.state.coinOptionSelected}}</span>
        </v-card-title>
        </v-layout>

      <v-layout align-center justify-center>

        <v-card-text>
          <v-text-field
            color="#EDC3C5"
            label="Enter Number of Coins Held"
            v-model="coinsHeld"
            :rules="inputRules"
            required
          ></v-text-field>
        </v-card-text>
      </v-layout>
      <v-card-actions>
        <v-btn @click="remove">Remove Coin</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="addCoinsHeld">Update Coins Held</v-btn>
        <v-btn color="#EDC3C5" @click="coinOptionClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    coinsHeld: 0,

    inputRules: [(v: any) => v >= 0 || "Cannot have negative amount of coins"]
  }),

  methods: {
    coinOptionClose() {
      this.$store.commit("coinOptionMenuSet", false);
      this.$store.commit("coinOptionSelectedClear");
    },

    addCoinsHeld(){
        this.$store.commit("setCoinsHeld", this.coinsHeld);
        this.$store.commit("updateCoinsHeld", this.$store.state.coinOptionSelected);
        this.$store.commit("clearCoinsHeld");
    },

    remove(){
      this.$store.commit("coinOptionMenuSet", false);
      this.$store.commit("popCoin", this.$store.state.coinOptionSelected);
      this.$store.commit("coinOptionSelectedClear");       
    }

  }
});
</script>